package com.ssafy.fullcourse.domain.review.application;

import com.ssafy.fullcourse.domain.place.entity.Restaurant;
import com.ssafy.fullcourse.domain.place.repository.BasePlaceRepository;
import com.ssafy.fullcourse.domain.review.application.BaseService.BaseReviewServiceImpl;
import com.ssafy.fullcourse.domain.review.dto.ReviewPostReq;
import com.ssafy.fullcourse.domain.review.entity.RestaurantReview;
import com.ssafy.fullcourse.domain.review.exception.PlaceNotFoundException;
import com.ssafy.fullcourse.domain.review.repository.BaseReviewRepository;
import com.ssafy.fullcourse.global.model.PlaceEnum;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
public class RestaurantReviewService extends BaseReviewServiceImpl<RestaurantReview, Restaurant> {
    public RestaurantReviewService(Map<String, BaseReviewRepository> policyMap, Map<String, BasePlaceRepository> policies) {
        super(policyMap, policies);
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
}
