package com.ssafy.fullcourse.domain.place.application;

import com.ssafy.fullcourse.domain.place.dto.ListReq;
import com.ssafy.fullcourse.domain.place.dto.PlaceRes;
import com.ssafy.fullcourse.domain.place.dto.RestaurantDetailRes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface RestaurantService {
    public Page<PlaceRes> restaurantList(ListReq listReq, Pageable pageable) throws Exception;
    public RestaurantDetailRes restaurantDetail(Long placeId) throws Exception;
    public boolean restaurantLike(Long placeId) throws Exception;
}
