package com.ssafy.fullcourse.domain.review.repository;

import com.ssafy.fullcourse.domain.review.entity.RestaurantReview;
import com.ssafy.fullcourse.domain.review.entity.RestaurantReviewLike;
import com.ssafy.fullcourse.domain.review.repository.baserepository.BaseReviewLikeRepository;

public interface RestaurantReviewLikeRepository
        extends BaseReviewLikeRepository<RestaurantReviewLike, RestaurantReview> {


}
