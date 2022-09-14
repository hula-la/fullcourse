package com.ssafy.fullcourse.domain.place.application;

import com.ssafy.fullcourse.domain.place.dto.ListReq;
import com.ssafy.fullcourse.domain.place.entity.Travel;

import java.util.List;

public interface TravelService {
    public List<Travel> travelList(ListReq listReq) throws Exception;
    public Travel travelDetail(Long placeId) throws Exception;
    public boolean travelLike(Long placeId) throws Exception;
}
