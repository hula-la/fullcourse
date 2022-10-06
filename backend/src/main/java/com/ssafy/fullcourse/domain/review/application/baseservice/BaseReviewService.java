package com.ssafy.fullcourse.domain.review.application.baseservice;

import com.drew.imaging.ImageProcessingException;
import com.ssafy.fullcourse.domain.place.entity.baseentity.BasePlace;
import com.ssafy.fullcourse.domain.place.repository.baserepository.BasePlaceRepository;
import com.ssafy.fullcourse.domain.review.dto.ReviewPostReq;
import com.ssafy.fullcourse.domain.review.dto.ReviewRes;
import com.ssafy.fullcourse.domain.review.entity.ActivityReview;
import com.ssafy.fullcourse.domain.review.entity.baseentity.BaseReview;
import com.ssafy.fullcourse.domain.review.entity.baseentity.BaseReviewLike;
import com.ssafy.fullcourse.domain.review.exception.PlaceNotFoundException;
import com.ssafy.fullcourse.domain.review.exception.ReviewNotFoundException;
import com.ssafy.fullcourse.domain.review.repository.baserepository.BaseReviewLikeRepository;
import com.ssafy.fullcourse.domain.review.repository.baserepository.BaseReviewRepository;
import com.ssafy.fullcourse.domain.user.entity.User;
import com.ssafy.fullcourse.domain.user.exception.UserNotFoundException;
import com.ssafy.fullcourse.domain.user.repository.UserRepository;
import com.ssafy.fullcourse.global.model.PlaceEnum;
import com.ssafy.fullcourse.global.util.AwsS3Service;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.Date;
import java.util.Map;
import java.util.Optional;

//@RequiredArgsConstructor
@NoArgsConstructor
public class BaseReviewService<R extends BaseReview, P extends BasePlace, RL extends BaseReviewLike>{



    @Autowired
    protected Map<String, BaseReviewRepository> baseReviewRepositoryMap;
    @Autowired
    protected  Map<String, BasePlaceRepository> basePlaceRepositoryMap;
    @Autowired
    protected Map<String, BaseReviewLikeRepository> baseReviewLikeMap;
    @Autowired
    protected UserRepository userRepository;
    @Autowired
    protected AwsS3Service awsS3Service;
//    protected final Map<String, BaseReviewRepository> baseReviewRepositoryMap;
//    protected final Map<String, BasePlaceRepository> basePlaceRepositoryMap;
//    protected final Map<String, BaseReviewLikeRepository> baseReviewLikeMap;
//
//    protected final UserRepository userRepository;
//
//    protected final AwsS3Service awsS3Service;

    protected final String defaultImg = "https://busanfullcourse.s3.ap-northeast-2.amazonaws.com/user/%ED%94%84%EB%A1%9C%ED%95%84.png";


    public void deleteReviewById(PlaceEnum Type, Long reviewId) {
        BaseReviewRepository baseReviewRepository = baseReviewRepositoryMap.get(Type.getRepository());
        Optional<R> review = baseReviewRepository.findById(reviewId);

        if(!review.isPresent()) throw new ReviewNotFoundException();

        awsS3Service.delete(review.get().getReviewImg());

//        System.out.println(review.get() instanceof CultureReview); //

        baseReviewRepository.deleteById(reviewId);
    }



    @Transactional
    public Long createReview(PlaceEnum Type, Long placeId, String email, ReviewPostReq reviewPostReq, MultipartFile file) throws IOException, ImageProcessingException {
        Optional<P> place = basePlaceRepositoryMap.get(Type.getPlace()).findByPlaceId(placeId);
        BaseReviewRepository baseReviewRepository = baseReviewRepositoryMap.get(Type.getRepository());

        // NotFoundException 턴지기
        if(!place.isPresent()) throw new PlaceNotFoundException();


        R baseReview = (R) R.<P>builder()
                .score(reviewPostReq.getScore())
                .content(reviewPostReq.getContent())
                .likeCnt(0L)
                .place(place.get())
                .user(userRepository.findByEmail(email).get())
                .build();

        if(file != null) {
            baseReview.setReviewImg(awsS3Service.uploadImage(file));
        } else {
            baseReview.setReviewImg(defaultImg);
        }

        baseReview.setRegDate(new Date());
        baseReviewRepository.save(baseReview);
        return baseReview.getReviewId();
    }


    public Page<ReviewRes> getReviews(PlaceEnum Type, Long placeId, Pageable pageable) {


        Optional<P> place = basePlaceRepositoryMap.get(Type.getPlace()).findByPlaceId(placeId);
        if(!place.isPresent()) throw new PlaceNotFoundException();
        Page<R> page = baseReviewRepositoryMap.get(Type.getRepository()).findByPlaceOrderByRegDateDesc(place.get(), pageable);

        return page.map(ReviewRes::new);
    }

    @Transactional
    public Long update(PlaceEnum Type, Long reviewId,ReviewPostReq reviewPostReq, MultipartFile file) {
        BaseReviewRepository baseReviewRepository = baseReviewRepositoryMap.get(Type.getRepository());
        Optional<R> reviewOpt = baseReviewRepository.findById(reviewId);
        if(!reviewOpt.isPresent()) throw new ReviewNotFoundException();

        R review = reviewOpt.get();
        
        
        String imgUrl;
        
        
        if(file != null) {
            if (!review.getReviewImg().equals(defaultImg)) {
                awsS3Service.delete(review.getReviewImg());
            }
            imgUrl = awsS3Service.uploadImage(file);
        } else {
            imgUrl = review.getReviewImg();
        }
        
        
        review.update(reviewPostReq.getContent(), reviewPostReq.getScore(),imgUrl);

        return reviewId;
    }


    @Transactional
    public Boolean reviewLike(PlaceEnum Type, String userId, Long reviewId) {
        BaseReviewRepository baseReviewRepository = baseReviewRepositoryMap.get(Type.getRepository());
        BaseReviewLikeRepository baseReviewRLikeRepository = baseReviewLikeMap.get(Type.getReviewLikeRepository());

        Optional<R> reviewOpt = baseReviewRepository.findById(reviewId);
        Optional<User> userOpt = userRepository.findByEmail(userId);

        if (!userOpt.isPresent()) throw new UserNotFoundException();
        if (!reviewOpt.isPresent()) throw new ReviewNotFoundException();



        Optional<RL> reviewLike= baseReviewRLikeRepository.findByUserAndReview(userOpt.get(),reviewOpt.get());

        if(reviewLike.isPresent()){
            reviewOpt.get().addLikeCnt(-1);
            baseReviewRLikeRepository.deleteById(reviewLike.get().getReviewLikeId());
        } else {
            reviewOpt.get().addLikeCnt(1);
            baseReviewRLikeRepository.save(BaseReviewLike.builder()
                    .user(userOpt.get())
                    .review(reviewOpt.get()));
        }


        return true;
    }

}
