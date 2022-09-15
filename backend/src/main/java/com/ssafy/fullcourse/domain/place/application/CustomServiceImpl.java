package com.ssafy.fullcourse.domain.place.application;

import com.ssafy.fullcourse.domain.place.dto.CustomDetailRes;
import com.ssafy.fullcourse.domain.place.dto.ListReq;
import com.ssafy.fullcourse.domain.place.dto.PlaceRes;
import com.ssafy.fullcourse.domain.place.repository.CustomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomServiceImpl implements CustomService{

    @Autowired
    CustomRepository customRepository;
    @Override
    public Page<PlaceRes> customList(ListReq listReq, Pageable pageable) throws Exception {
        return null;
    }

    @Override
    public CustomDetailRes customDetail(Long placeId) throws Exception {
        return customRepository.findByPlaceId(placeId).get().toDetailDto();
    }

    @Override
    public boolean customLike(Long placeId) throws Exception {
        return false;
    }
}
