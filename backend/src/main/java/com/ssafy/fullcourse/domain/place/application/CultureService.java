package com.ssafy.fullcourse.domain.place.application;

import com.ssafy.fullcourse.domain.place.dto.CultureDetailRes;
import com.ssafy.fullcourse.domain.place.dto.ListReq;
import com.ssafy.fullcourse.domain.place.dto.PlaceRes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CultureService {
    public Page<PlaceRes> getCultureList(ListReq listReq, Pageable pageable) throws Exception;
    public CultureDetailRes getCultureDetail(Long placeId) throws Exception;
    public boolean cultureLike(Long placeId, Long userId) throws Exception;
}
