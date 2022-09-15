package com.ssafy.fullcourse.domain.place.application;

import com.ssafy.fullcourse.domain.place.dto.ActivityDetailRes;
import com.ssafy.fullcourse.domain.place.dto.ListReq;
import com.ssafy.fullcourse.domain.place.dto.PlaceRes;
import com.ssafy.fullcourse.domain.place.repository.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ActivityServiceImpl implements ActivityService{
    @Autowired
    ActivityRepository activityRepository;
    @Override
    public Page<PlaceRes> activityList(ListReq listReq, Pageable pageable) throws Exception {
        return null;
    }

    @Override
    public ActivityDetailRes activityDetail(Long placeId) throws Exception {
        return activityRepository.findByPlaceId(placeId).get().toDetailDto();
    }

    @Override
    public boolean activityLike(Long placeId) throws Exception {
        return false;
    }
}
