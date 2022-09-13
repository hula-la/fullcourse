package com.ssafy.fullcourse.domain.review.application;

import com.ssafy.fullcourse.domain.place.entity.Hotel;
import com.ssafy.fullcourse.domain.place.repository.BasePlaceRepository;
import com.ssafy.fullcourse.domain.review.application.BaseService.BaseReviewServiceImpl;
import com.ssafy.fullcourse.domain.review.dto.ReviewPostReq;
import com.ssafy.fullcourse.domain.review.entity.HotelReview;
import com.ssafy.fullcourse.domain.review.exception.PlaceNotFoundException;
import com.ssafy.fullcourse.domain.review.repository.BaseReviewRepository;
import com.ssafy.fullcourse.global.model.PlaceEnum;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
public class HotelReviewService extends BaseReviewServiceImpl<HotelReview, Hotel> {
    public HotelReviewService(Map<String, BaseReviewRepository> policyMap, Map<String, BasePlaceRepository> policies) {
        super(policyMap, policies);
    }

    @Override
    public Long createReview(PlaceEnum Type, Long placeId, ReviewPostReq reviewPostReq) {
        Optional<Hotel> place = basePlaceRepositoryMap.get(Type.getPlace()).findByPlaceId(placeId);
        BaseReviewRepository baseReviewRepository = baseReviewRepositoryMap.get(Type.getRepository());


        // NotFoundException 턴지기
        if(!place.isPresent()) throw new PlaceNotFoundException();


        HotelReview baseReview = HotelReview.builder()
                .score(reviewPostReq.getScore())
                .content(reviewPostReq.getContent())
                .likeCnt(0L)
                .place(place.get())
                .build();


        baseReviewRepository.save(baseReview);
        return baseReview.getReviewId();
    }
}
