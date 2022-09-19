package com.ssafy.fullcourse.domain.place.application;

import com.ssafy.fullcourse.domain.place.dto.ActivityDetailRes;
import com.ssafy.fullcourse.domain.place.dto.ListReq;
import com.ssafy.fullcourse.domain.place.dto.PlaceRes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ActivityService {
    public Page<PlaceRes> getActivityList(Pageable pageable) throws Exception;
    public ActivityDetailRes getActivityDetail(Long placeId) throws Exception;
    public boolean activityLike(Long placeId, Long userId) throws Exception;
}
