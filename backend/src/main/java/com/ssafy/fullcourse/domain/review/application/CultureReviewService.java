package com.ssafy.fullcourse.domain.review.application;

import com.ssafy.fullcourse.domain.place.entity.Culture;
import com.ssafy.fullcourse.domain.place.repository.BasePlaceRepository;
import com.ssafy.fullcourse.domain.review.application.BaseService.BaseReviewServiceImpl;
import com.ssafy.fullcourse.domain.review.dto.ReviewPostReq;
import com.ssafy.fullcourse.domain.review.entity.CultureReview;
import com.ssafy.fullcourse.domain.review.entity.CultureReviewLike;
import com.ssafy.fullcourse.domain.review.exception.PlaceNotFoundException;
import com.ssafy.fullcourse.domain.review.repository.BaseReviewLikeRepository;
import com.ssafy.fullcourse.domain.review.repository.BaseReviewRepository;
import com.ssafy.fullcourse.global.model.PlaceEnum;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
public class CultureReviewService extends BaseReviewServiceImpl<CultureReview, Culture, CultureReviewLike
        > {


    public CultureReviewService(Map<String, BaseReviewRepository> baseReviewRepositoryMap,
                                Map<String, BasePlaceRepository> basePlaceRepositoryMap,
                                Map<String, BaseReviewLikeRepository> baseReviewLikeMap) {
        super(baseReviewRepositoryMap, basePlaceRepositoryMap, baseReviewLikeMap);
    }

    @Override
    public Long createReview(PlaceEnum Type, Long placeId, ReviewPostReq reviewPostReq) {
        Optional<Culture> place = basePlaceRepositoryMap.get(Type.getPlace()).findByPlaceId(placeId);
        BaseReviewRepository baseReviewRepository = baseReviewRepositoryMap.get(Type.getRepository());


        // NotFoundException 턴지기
        if(!place.isPresent()) throw new PlaceNotFoundException();


        CultureReview baseReview = CultureReview.builder()
                .score(reviewPostReq.getScore())
                .content(reviewPostReq.getContent())
                .likeCnt(0L)
                .place(place.get())
                .build();


        baseReviewRepository.save(baseReview);
        return baseReview.getReviewId();
    }
}
