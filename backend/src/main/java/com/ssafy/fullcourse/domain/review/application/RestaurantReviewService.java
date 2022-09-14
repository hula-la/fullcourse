package com.ssafy.fullcourse.domain.review.application;

import com.ssafy.fullcourse.domain.place.entity.Restaurant;
import com.ssafy.fullcourse.domain.place.repository.BasePlaceRepository;
import com.ssafy.fullcourse.domain.review.application.baseservice.BaseReviewServiceImpl;
import com.ssafy.fullcourse.domain.review.dto.ReviewPostReq;
import com.ssafy.fullcourse.domain.review.entity.*;
import com.ssafy.fullcourse.domain.review.entity.RestaurantReview;
import com.ssafy.fullcourse.domain.review.entity.RestaurantReviewLike;
import com.ssafy.fullcourse.domain.review.entity.baseentity.BaseReviewLike;
import com.ssafy.fullcourse.domain.review.exception.PlaceNotFoundException;
import com.ssafy.fullcourse.domain.review.exception.ReviewNotFoundException;
import com.ssafy.fullcourse.domain.review.repository.baserepository.BaseReviewLikeRepository;
import com.ssafy.fullcourse.domain.review.repository.baserepository.BaseReviewRepository;
import com.ssafy.fullcourse.domain.user.entity.User;
import com.ssafy.fullcourse.domain.user.exception.UserNotFoundException;
import com.ssafy.fullcourse.global.model.PlaceEnum;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Map;
import java.util.Optional;

@Service
public class RestaurantReviewService extends BaseReviewServiceImpl<RestaurantReview, Restaurant, RestaurantReviewLike> {
    public RestaurantReviewService(Map<String, BaseReviewRepository> baseReviewRepositoryMap,
                              Map<String, BasePlaceRepository> basePlaceRepositoryMap,
                              Map<String, BaseReviewLikeRepository> baseReviewLikeMap) {
        super(baseReviewRepositoryMap, basePlaceRepositoryMap, baseReviewLikeMap);
    }
    @Override
    public Long createReview(PlaceEnum Type, Long placeId, ReviewPostReq reviewPostReq) {
        Optional<Restaurant> place = basePlaceRepositoryMap.get(Type.getPlace()).findByPlaceId(placeId);
        BaseReviewRepository baseReviewRepository = baseReviewRepositoryMap.get(Type.getRepository());


        // NotFoundException 턴지기
        if(!place.isPresent()) throw new PlaceNotFoundException();


        RestaurantReview baseReview = RestaurantReview.builder()
                .score(reviewPostReq.getScore())
                .content(reviewPostReq.getContent())
                .likeCnt(0L)
                .place(place.get())
                .build();

        baseReviewRepository.save(baseReview);
        return baseReview.getReviewId();
    }

    @Override
    @Transactional
    public Boolean reviewLike(PlaceEnum Type, Long userId, Long reviewId) {
        BaseReviewRepository baseReviewRepository = baseReviewRepositoryMap.get(Type.getRepository());
        BaseReviewLikeRepository baseReviewRLikeRepository = baseReviewLikeMap.get(Type.getReviewLikeRepository());

        Optional<RestaurantReview> reviewOpt = baseReviewRepository.findById(reviewId);
        Optional<User> userOpt = userRepository.findById(userId);

        if (!userOpt.isPresent()) throw new UserNotFoundException();
        if (!reviewOpt.isPresent()) throw new ReviewNotFoundException();


        Optional<RestaurantReviewLike> reviewLike= baseReviewRLikeRepository.findByUserAndReview(userOpt.get(),reviewOpt.get());

        if(reviewLike.isPresent()){
            baseReviewRLikeRepository.deleteById(reviewLike.get().getReviewLikeId());
        } else {
            baseReviewRLikeRepository.save(RestaurantReviewLike.builder()
                    .user(userOpt.get())
                    .review(reviewOpt.get())
                    .build());
        }


        return true;
    }
}
