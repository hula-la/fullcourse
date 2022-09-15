package com.ssafy.fullcourse.domain.place.repository;

import com.ssafy.fullcourse.domain.place.entity.Restaurant;
import com.ssafy.fullcourse.domain.place.entity.RestaurantLike;
import com.ssafy.fullcourse.domain.place.repository.baserepository.BaseLikeRepository;

public interface RestaurantLikeRepository  extends BaseLikeRepository<RestaurantLike, Restaurant> {
}
