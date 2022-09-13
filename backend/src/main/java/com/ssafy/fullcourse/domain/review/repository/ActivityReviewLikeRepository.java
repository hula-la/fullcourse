package com.ssafy.fullcourse.domain.review.repository;

import com.ssafy.fullcourse.domain.review.entity.ActivityReview;
import com.ssafy.fullcourse.domain.review.entity.ActivityReviewLike;
import com.ssafy.fullcourse.domain.review.repository.baserepository.BaseReviewLikeRepository;

public interface ActivityReviewLikeRepository
        extends BaseReviewLikeRepository<ActivityReviewLike, ActivityReview> {


}
