package com.ssafy.fullcourse.domain.place.application;

import com.ssafy.fullcourse.domain.place.dto.CultureDetailRes;
import com.ssafy.fullcourse.domain.place.dto.ListReq;
import com.ssafy.fullcourse.domain.place.dto.PlaceRes;
import com.ssafy.fullcourse.domain.place.repository.CultureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CultureServiceImpl implements CultureService{

    @Autowired
    CultureRepository cultureRepository;
    @Override
    public Page<PlaceRes> cultureList(ListReq listReq, Pageable pageable) throws Exception {
        return null;
    }

    @Override
    public CultureDetailRes cultureDetail(Long placeId) throws Exception {
        return cultureRepository.findByPlaceId(placeId).get().toDetailDto();
    }

    @Override
    public boolean cultureLike(Long placeId) throws Exception {
        return false;
    }
}
