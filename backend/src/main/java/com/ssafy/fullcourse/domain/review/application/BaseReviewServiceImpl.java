package com.ssafy.fullcourse.domain.review.application;

import com.ssafy.fullcourse.domain.place.entity.Activity;
import com.ssafy.fullcourse.domain.place.entity.BasePlace;
import com.ssafy.fullcourse.domain.place.repository.BasePlaceRepository;
import com.ssafy.fullcourse.domain.review.dto.ReviewPostReq;
import com.ssafy.fullcourse.domain.review.dto.ReviewRes;
import com.ssafy.fullcourse.domain.review.entity.ActivityReview;
import com.ssafy.fullcourse.domain.review.entity.BaseReview;
import com.ssafy.fullcourse.domain.review.exception.PlaceNotFoundException;
import com.ssafy.fullcourse.domain.review.exception.ReviewNotFoundException;
import com.ssafy.fullcourse.domain.review.repository.BaseReviewRepository;
import com.ssafy.fullcourse.global.model.PlaceEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

public class BaseReviewServiceImpl<R extends BaseReview, P extends BasePlace> implements BaseReviewService<R,P>{



    private final Map<String, BasePlaceRepository> basePlaceRepositoryMap;

    private final Map<String, BaseReviewRepository> baseReviewRepositoryMap;

    @Autowired
    public BaseReviewServiceImpl(Map<String, BaseReviewRepository> baseReviewRepositoryMap, Map<String, BasePlaceRepository> basePlaceRepositoryMap) {
        this.baseReviewRepositoryMap = baseReviewRepositoryMap;
        this.basePlaceRepositoryMap = basePlaceRepositoryMap;

        //의존관계 주입 확인을 위해 출력
        System.out.println("baseReviewRepositoryMap = " + baseReviewRepositoryMap);
        System.out.println("basePlaceRepositoryMap = " + basePlaceRepositoryMap);
    }



    @Override
    public void deleteReviewById(PlaceEnum Type, Long reviewId) {
        if(!baseReviewRepositoryMap.get(Type).existsById(reviewId)) throw new ReviewNotFoundException();
        baseReviewRepositoryMap.get(Type).deleteById(reviewId);
    }



    @Override
    public Long createReview(PlaceEnum Type, Long placeId, ReviewPostReq reviewPostReq) {
//        System.out.println(R.builder().build());

        Optional<P> place = basePlaceRepositoryMap.get("activityRepository").findByPlaceId(placeId);
        BaseReviewRepository baseReviewRepository = baseReviewRepositoryMap.get(Type.getRepository());

        // NotFoundException 턴지기
        if(!place.isPresent()) throw new PlaceNotFoundException();


        R baseReview = (R) R.builder()
                .score(reviewPostReq.getScore())
                .content(reviewPostReq.getContent())
                .likeCnt(0L)
                .place(place.get())
                .build();


        System.out.println((baseReview instanceof ActivityReview) +"**2****"+baseReview);
//        new BaseReview<R>(reviewPostReq.getScore(),)
        return ((R)baseReviewRepository.save(baseReview)).getReviewId();
    }

    @Override
    public Page<ReviewRes> getReviews(PlaceEnum Type, Long placeId, Pageable pageable) {


        Optional<P> place = basePlaceRepositoryMap.get("activityRepository").findByPlaceId(placeId);
        if(!place.isPresent()) throw new PlaceNotFoundException();
        Page<R> page = baseReviewRepositoryMap.get(Type.getRepository()).findByPlaceContaining((Activity)place.get(), pageable);
        return page.map(ReviewRes::new);
    }

}
