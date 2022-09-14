package com.ssafy.fullcourse.domain.review.repository;

import com.ssafy.fullcourse.domain.place.entity.Hotel;
import com.ssafy.fullcourse.domain.review.entity.HotelReview;
import com.ssafy.fullcourse.domain.review.repository.baserepository.BaseReviewRepository;

public interface HotelReviewRepository extends BaseReviewRepository<HotelReview, Hotel> {


}
