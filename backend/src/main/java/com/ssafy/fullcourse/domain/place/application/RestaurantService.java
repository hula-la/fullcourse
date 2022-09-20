package com.ssafy.fullcourse.domain.place.application;

import com.ssafy.fullcourse.domain.place.dto.PlaceRes;
import com.ssafy.fullcourse.domain.place.dto.RestaurantDetailRes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface RestaurantService {

    public Page<PlaceRes> getRestaurantList(Pageable pageable, String keyword) throws Exception;
    public RestaurantDetailRes getRestaurantDetail(Long placeId) throws Exception;
    public boolean restaurantLike(Long placeId, Long userId) throws Exception;
}
