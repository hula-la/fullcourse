package com.ssafy.fullcourse.domain.review.application;

import com.ssafy.fullcourse.domain.place.entity.BasePlace;
import com.ssafy.fullcourse.domain.review.dto.ReviewPostReq;
import com.ssafy.fullcourse.domain.review.dto.ReviewRes;
import com.ssafy.fullcourse.domain.review.entity.BaseReview;
import com.ssafy.fullcourse.global.model.PlaceEnum;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BaseReviewService<R extends BaseReview, P extends BasePlace> {

    Long createReview(PlaceEnum Type, Long placeId, ReviewPostReq reviewPostReq);

    Page<ReviewRes> getReviews(PlaceEnum Type, Long placeId,Pageable pageable);

    void deleteReviewById(PlaceEnum Type, Long reviewId);

//    void setBaseReviewRepository(List<BaseReviewRepository> baseReviewRepositoryList);
//
//    void setBasePlaceRepository(List<BasePlaceRepository> basePlaceRepositoryList);
}
