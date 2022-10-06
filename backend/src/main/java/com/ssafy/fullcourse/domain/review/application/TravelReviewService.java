package com.ssafy.fullcourse.domain.review.application;

import com.drew.imaging.ImageMetadataReader;
import com.drew.imaging.ImageProcessingException;
import com.drew.lang.GeoLocation;
import com.drew.metadata.Metadata;
import com.drew.metadata.exif.GpsDirectory;
import com.ssafy.fullcourse.domain.place.entity.Travel;
import com.ssafy.fullcourse.domain.review.application.baseservice.BaseReviewService;
import com.ssafy.fullcourse.domain.review.dto.ReviewPostReq;
import com.ssafy.fullcourse.domain.review.entity.TravelReview;
import com.ssafy.fullcourse.domain.review.entity.TravelReviewLike;
import com.ssafy.fullcourse.domain.review.exception.PlaceNotFoundException;
import com.ssafy.fullcourse.domain.review.exception.ReviewNotFoundException;
import com.ssafy.fullcourse.domain.review.repository.baserepository.BaseReviewLikeRepository;
import com.ssafy.fullcourse.domain.review.repository.baserepository.BaseReviewRepository;
import com.ssafy.fullcourse.domain.user.entity.User;
import com.ssafy.fullcourse.domain.user.exception.UserNotFoundException;
import com.ssafy.fullcourse.global.model.PlaceEnum;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.Optional;

@Service
public class TravelReviewService extends BaseReviewService<TravelReview, Travel, TravelReviewLike> {


    @Override
    public Long createReview(PlaceEnum Type, Long placeId, String email, ReviewPostReq reviewPostReq, MultipartFile file) throws ImageProcessingException, IOException {
        Optional<Travel> place = basePlaceRepositoryMap.get(Type.getPlace()).findByPlaceId(placeId);
        BaseReviewRepository baseReviewRepository = baseReviewRepositoryMap.get(Type.getRepository());

        // NotFoundException 턴지기
        if(!place.isPresent()) throw new PlaceNotFoundException();

        TravelReview baseReview = TravelReview.builder()
                .score(reviewPostReq.getScore())
                .content(reviewPostReq.getContent())
                .likeCnt(0L)
                .place(place.get())
                .user(userRepository.findByEmail(email).get())
                .isVisited(false)
                .regDate(new Date())
                .build();
        if(file != null && !file.isEmpty()){
            File f = convert(file);
            Metadata metadata = ImageMetadataReader.readMetadata(f);
            GpsDirectory gpsDirectory = metadata.getFirstDirectoryOfType(GpsDirectory.class);
            if (gpsDirectory != null) {
                GeoLocation geoLocation = gpsDirectory.getGeoLocation();
                if (geoLocation != null && !geoLocation.isZero()) {
                    double[] latLng = new double[2];
                    latLng[0] = geoLocation.getLatitude();
                    latLng[1] = geoLocation.getLongitude();
                    f.delete();
                    System.out.println(latLng[0] + " " + latLng[1]);
                    //confirmVisitByImage(latLng, fcDetailId);
                    float lat = place.get().getLat();
                    float lng = place.get().getLng();

                    Double dist =
                            Math.sqrt(Math.pow((latLng[0] - lat) * 88.9036, 2) + Math.pow((latLng[1] - lng) * 111.3194, 2));
                    System.out.println("계산된 거리 : " + dist + "Km");
                    if (dist < 1) {
                        baseReview.setIsVisited(true);
                    }
                }
            }
        }
        // 평점 계산.
        float updateReviewScore = (place.get().getReviewCnt() * place.get().getReviewScore() + reviewPostReq.getScore()) / (place.get().getReviewCnt() + 1);
        place.get().updateReviewScore(updateReviewScore);
        basePlaceRepositoryMap.get(Type.getPlace()).save(place.get());

        if(file != null) {
            baseReview.setReviewImg(awsS3Service.uploadImage(file));
        } else {
            baseReview.setReviewImg(defaultImg);
        }

        baseReviewRepository.save(baseReview);
        return baseReview.getReviewId();
    }

    @Override
    @Transactional
    public Boolean reviewLike(PlaceEnum Type, String userId, Long reviewId) {
        BaseReviewRepository baseReviewRepository = baseReviewRepositoryMap.get(Type.getRepository());
        BaseReviewLikeRepository baseReviewRLikeRepository = baseReviewLikeMap.get(Type.getReviewLikeRepository());

        Optional<TravelReview> reviewOpt = baseReviewRepository.findById(reviewId);
        Optional<User> userOpt = userRepository.findByEmail(userId);

        if (!userOpt.isPresent()) throw new UserNotFoundException();
        if (!reviewOpt.isPresent()) throw new ReviewNotFoundException();


        Optional<TravelReviewLike> reviewLike= baseReviewRLikeRepository.findByUserAndReview(userOpt.get(),reviewOpt.get());

        if(reviewLike.isPresent()){
            reviewOpt.get().addLikeCnt(-1);
            baseReviewRLikeRepository.deleteById(reviewLike.get().getReviewLikeId());
        } else {
            reviewOpt.get().addLikeCnt(1);
            baseReviewRLikeRepository.save(TravelReviewLike.builder()
                    .user(userOpt.get())
                    .review(reviewOpt.get())
                    .build());
        }


        return true;
    }
    public File convert(MultipartFile multipartFile) throws IOException {
        File file = new File(multipartFile.getOriginalFilename());
        file.createNewFile();
        FileOutputStream fos = new FileOutputStream(file);
        fos.write(multipartFile.getBytes());
        fos.close();
        return file;
    }
}
