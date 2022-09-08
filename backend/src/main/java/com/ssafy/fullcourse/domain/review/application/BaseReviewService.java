package com.ssafy.fullcourse.domain.review.application;

import com.ssafy.fullcourse.domain.review.dto.ReviewPostReq;
import com.ssafy.fullcourse.domain.review.dto.ReviewRes;
import com.ssafy.fullcourse.domain.review.entity.BaseReview;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BaseReviewService<R extends BaseReview> {

    Long createReview(ReviewPostReq reviewPostReq);

    Page<ReviewRes> getReviews(Pageable pageable);

    void deleteReviewById(Long reviewId);
}
