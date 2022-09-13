package com.ssafy.fullcourse.domain.review.application;

import com.ssafy.fullcourse.domain.place.entity.Travel;
import com.ssafy.fullcourse.domain.place.repository.BasePlaceRepository;
import com.ssafy.fullcourse.domain.review.application.BaseService.BaseReviewServiceImpl;
import com.ssafy.fullcourse.domain.review.dto.ReviewPostReq;
import com.ssafy.fullcourse.domain.review.entity.TravelReview;
import com.ssafy.fullcourse.domain.review.exception.PlaceNotFoundException;
import com.ssafy.fullcourse.domain.review.repository.BaseReviewRepository;
import com.ssafy.fullcourse.global.model.PlaceEnum;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
public class TravelReviewService extends BaseReviewServiceImpl<TravelReview, Travel> {
    public TravelReviewService(Map<String, BaseReviewRepository> policyMap, Map<String, BasePlaceRepository> policies) {
        super(policyMap, policies);
    }

    @Override
    public Long createReview(PlaceEnum Type, Long placeId, ReviewPostReq reviewPostReq) {
        Optional<Travel> place = basePlaceRepositoryMap.get(Type.getPlace()).findByPlaceId(placeId);
        BaseReviewRepository baseReviewRepository = baseReviewRepositoryMap.get(Type.getRepository());


        // NotFoundException 턴지기
        if(!place.isPresent()) throw new PlaceNotFoundException();


        TravelReview baseReview = TravelReview.builder()
                .score(reviewPostReq.getScore())
                .content(reviewPostReq.getContent())
                .likeCnt(0L)
                .place(place.get())
                .build();



        baseReviewRepository.save(baseReview);
        return baseReview.getReviewId();
    }
}
