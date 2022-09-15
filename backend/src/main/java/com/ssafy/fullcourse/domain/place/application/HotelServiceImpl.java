package com.ssafy.fullcourse.domain.place.application;

import com.ssafy.fullcourse.domain.place.dto.HotelDetailRes;
import com.ssafy.fullcourse.domain.place.dto.ListReq;
import com.ssafy.fullcourse.domain.place.dto.PlaceRes;
import com.ssafy.fullcourse.domain.place.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HotelServiceImpl implements HotelService{

    @Autowired
    HotelRepository hotelRepository;
    @Override
    public Page<PlaceRes> hotelList(ListReq listReq, Pageable pageable) throws Exception {
        return null;
    }

    @Override
    public HotelDetailRes hotelDetail(Long placeId) throws Exception {
        return hotelRepository.findByPlaceId(placeId).get().toDetailDto();
    }

    @Override
    public boolean hotelLike(Long placeId) throws Exception {
        return false;
    }
}
