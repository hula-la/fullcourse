package com.ssafy.fullcourse.domain.review.application.baseservice;

import com.ssafy.fullcourse.domain.place.entity.BasePlace;
import com.ssafy.fullcourse.domain.review.dto.ReviewPostReq;
import com.ssafy.fullcourse.domain.review.dto.ReviewRes;
import com.ssafy.fullcourse.domain.review.entity.baseentity.BaseReview;
import com.ssafy.fullcourse.global.model.PlaceEnum;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BaseReviewService<R extends BaseReview, P extends BasePlace> {

    Long createReview(PlaceEnum Type, Long placeId, ReviewPostReq reviewPostReq);

    Page<ReviewRes> getReviews(PlaceEnum Type, Long placeId,Pageable pageable);

    void deleteReviewById(PlaceEnum Type, Long reviewId);

    Long update(PlaceEnum Type, Long reviewId,ReviewPostReq reviewPostReq);

    Boolean reviewLike(PlaceEnum Type, Long userId, Long reviewId);

}
