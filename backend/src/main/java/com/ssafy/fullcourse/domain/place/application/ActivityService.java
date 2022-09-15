package com.ssafy.fullcourse.domain.place.application;

import com.ssafy.fullcourse.domain.place.dto.ActivityDetailRes;
import com.ssafy.fullcourse.domain.place.dto.ListReq;
import com.ssafy.fullcourse.domain.place.dto.PlaceRes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ActivityService {
    public Page<PlaceRes> activityList(ListReq listReq, Pageable pageable) throws Exception;
    public ActivityDetailRes activityDetail(Long placeId) throws Exception;
    public boolean activityLike(Long placeId) throws Exception;
}
