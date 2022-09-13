package com.ssafy.fullcourse.domain.review.repository;

import com.ssafy.fullcourse.domain.review.entity.CultureReview;
import com.ssafy.fullcourse.domain.review.entity.CultureReviewLike;
import com.ssafy.fullcourse.domain.review.repository.baserepository.BaseReviewLikeRepository;

public interface CultureReviewLikeRepository
        extends BaseReviewLikeRepository<CultureReviewLike, CultureReview> {

}
