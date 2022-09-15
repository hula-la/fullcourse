package com.ssafy.fullcourse.domain.place.application;

import com.ssafy.fullcourse.domain.place.dto.CultureDetailRes;
import com.ssafy.fullcourse.domain.place.dto.ListReq;
import com.ssafy.fullcourse.domain.place.dto.PlaceRes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CultureService {
    public Page<PlaceRes> cultureList(ListReq listReq, Pageable pageable) throws Exception;
    public CultureDetailRes cultureDetail(Long placeId) throws Exception;
    public boolean cultureLike(Long placeId) throws Exception;
}
