package com.ssafy.fullcourse.domain.review.repository;

import com.ssafy.fullcourse.domain.review.entity.HotelReview;
import com.ssafy.fullcourse.domain.review.entity.HotelReviewLike;
import com.ssafy.fullcourse.domain.review.repository.baserepository.BaseReviewLikeRepository;

public interface HotelReviewLikeRepository
        extends BaseReviewLikeRepository<HotelReviewLike, HotelReview> {


}
