package com.ssafy.fullcourse.domain.place.application;

import com.ssafy.fullcourse.domain.place.dto.CustomDetailRes;
import com.ssafy.fullcourse.domain.place.dto.ListReq;
import com.ssafy.fullcourse.domain.place.dto.PlaceRes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CustomService {
    public Page<PlaceRes> customList(ListReq listReq, Pageable pageable) throws Exception;
    public CustomDetailRes customDetail(Long placeId) throws Exception;
    public boolean customLike(Long placeId) throws Exception;
}
