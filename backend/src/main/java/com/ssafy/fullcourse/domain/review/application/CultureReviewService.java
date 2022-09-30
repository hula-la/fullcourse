package com.ssafy.fullcourse.domain.review.application;

import com.ssafy.fullcourse.domain.place.entity.Culture;
import com.ssafy.fullcourse.domain.place.repository.baserepository.BasePlaceRepository;
import com.ssafy.fullcourse.domain.review.application.baseservice.BaseReviewService;
import com.ssafy.fullcourse.domain.review.dto.ReviewPostReq;
import com.ssafy.fullcourse.domain.review.entity.CultureReview;
import com.ssafy.fullcourse.domain.review.entity.CultureReviewLike;
import com.ssafy.fullcourse.domain.review.exception.PlaceNotFoundException;
import com.ssafy.fullcourse.domain.review.exception.ReviewNotFoundException;
import com.ssafy.fullcourse.domain.review.repository.baserepository.BaseReviewLikeRepository;
import com.ssafy.fullcourse.domain.review.repository.baserepository.BaseReviewRepository;
import com.ssafy.fullcourse.domain.user.entity.User;
import com.ssafy.fullcourse.domain.user.exception.UserNotFoundException;
import com.ssafy.fullcourse.domain.user.repository.UserRepository;
import com.ssafy.fullcourse.global.model.PlaceEnum;
import lombok.experimental.SuperBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.Map;
import java.util.Optional;

@Service
public class CultureReviewService extends BaseReviewService<CultureReview, Culture, CultureReviewLike> {


    @Override
    public Long createReview(PlaceEnum Type, Long placeId, String email, ReviewPostReq reviewPostReq, MultipartFile file) {
        Optional<Culture> place = basePlaceRepositoryMap.get(Type.getPlace()).findByPlaceId(placeId);
        BaseReviewRepository baseReviewRepository = baseReviewRepositoryMap.get(Type.getRepository());


        // NotFoundException 턴지기
        if(!place.isPresent()) throw new PlaceNotFoundException();


        CultureReview baseReview = CultureReview.builder()
                .score(reviewPostReq.getScore())
                .content(reviewPostReq.getContent())
                .likeCnt(0L)
                .place(place.get())
                .user(userRepository.findByEmail(email).get())
                .build();
// 평점 계산.
        place.get().setReviewScore((place.get().getReviewCnt() * place.get().getReviewScore() + reviewPostReq.getScore()) / place.get().getReviewCnt() + 1);
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

        Optional<CultureReview> reviewOpt = baseReviewRepository.findById(reviewId);
        Optional<User> userOpt = userRepository.findByEmail(userId);

        if (!userOpt.isPresent()) throw new UserNotFoundException();
        if (!reviewOpt.isPresent()) throw new ReviewNotFoundException();


        Optional<CultureReviewLike> reviewLike= baseReviewRLikeRepository.findByUserAndReview(userOpt.get(),reviewOpt.get());

        if(reviewLike.isPresent()){
            baseReviewRLikeRepository.deleteById(reviewLike.get().getReviewLikeId());
            reviewOpt.get().addLikeCnt(-1);
        } else {
            reviewOpt.get().addLikeCnt(1);
            baseReviewRLikeRepository.save(CultureReviewLike.builder()
                    .user(userOpt.get())
                    .review(reviewOpt.get())
                    .build());
        }


        return true;
    }
}
