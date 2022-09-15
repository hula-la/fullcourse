package com.ssafy.fullcourse.domain.place.application;

import com.ssafy.fullcourse.domain.place.dto.CustomDetailRes;
import com.ssafy.fullcourse.domain.place.dto.ListReq;
import com.ssafy.fullcourse.domain.place.dto.PlaceRes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CustomService {
    public Page<PlaceRes> getCustomList(ListReq listReq, Pageable pageable) throws Exception;
    public CustomDetailRes getCustomDetail(Long placeId) throws Exception;
    public Long createCustom(Long placeId, Long userId) throws Exception;
}
