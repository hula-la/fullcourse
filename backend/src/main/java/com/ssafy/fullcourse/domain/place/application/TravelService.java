package com.ssafy.fullcourse.domain.place.application;

import com.ssafy.fullcourse.domain.place.dto.ListReq;
import com.ssafy.fullcourse.domain.place.dto.PlaceRes;
import com.ssafy.fullcourse.domain.place.dto.TravelDetailRes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TravelService {
    public Page<PlaceRes> travelList(ListReq listReq, Pageable pageable) throws Exception;
    public TravelDetailRes travelDetail(Long placeId) throws Exception;
    public boolean travelLike(Long placeId) throws Exception;
}
