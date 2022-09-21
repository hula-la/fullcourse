package com.ssafy.fullcourse.domain.place.application;

import com.ssafy.fullcourse.domain.place.dto.PlaceRes;
import com.ssafy.fullcourse.domain.place.dto.TravelDetailRes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TravelService {

    public Page<PlaceRes> getTravelList(Pageable pageable, String keyword, String tag) throws Exception;
    public TravelDetailRes getTravelDetail(Long placeId) throws Exception;
    public boolean travelLike(Long placeId, Long userId) throws Exception;
}
