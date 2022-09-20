package com.ssafy.fullcourse.domain.place.application;

import com.ssafy.fullcourse.domain.place.dto.HotelDetailRes;
import com.ssafy.fullcourse.domain.place.dto.PlaceRes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface HotelService {

    public Page<PlaceRes> getHotelList(Pageable pageable, String keyword) throws Exception;
    public HotelDetailRes getHotelDetail(Long placeId) throws Exception;
    public boolean hotelLike(Long placeId, Long userId) throws Exception;
}
