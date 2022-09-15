package com.ssafy.fullcourse.domain.place.application;

import com.ssafy.fullcourse.domain.place.dto.HotelDetailRes;
import com.ssafy.fullcourse.domain.place.dto.ListReq;
import com.ssafy.fullcourse.domain.place.dto.PlaceRes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface HotelService {
    public Page<PlaceRes> hotelList(ListReq listReq, Pageable pageable) throws Exception;
    public HotelDetailRes hotelDetail(Long placeId) throws Exception;
    public boolean hotelLike(Long placeId) throws Exception;
}
