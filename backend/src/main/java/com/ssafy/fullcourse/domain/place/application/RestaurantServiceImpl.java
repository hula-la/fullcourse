package com.ssafy.fullcourse.domain.place.application;

import com.ssafy.fullcourse.domain.place.dto.ListReq;
import com.ssafy.fullcourse.domain.place.dto.PlaceRes;
import com.ssafy.fullcourse.domain.place.dto.RestaurantDetailRes;
import com.ssafy.fullcourse.domain.place.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class RestaurantServiceImpl implements RestaurantService{
    @Autowired
    RestaurantRepository restaurantRepository;
    @Override
    public Page<PlaceRes> restaurantList(ListReq listReq, Pageable pageable) throws Exception {
        return null;
    }

    @Override
    public RestaurantDetailRes restaurantDetail(Long placeId) throws Exception {
        return restaurantRepository.findByPlaceId(placeId).get().toDetailDto();
    }

    @Override
    public boolean restaurantLike(Long placeId) throws Exception {
        return false;
    }
}
