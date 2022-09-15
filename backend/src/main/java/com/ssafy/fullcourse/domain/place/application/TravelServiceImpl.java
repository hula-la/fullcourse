package com.ssafy.fullcourse.domain.place.application;

import com.ssafy.fullcourse.domain.place.dto.ListReq;
import com.ssafy.fullcourse.domain.place.dto.PlaceRes;
import com.ssafy.fullcourse.domain.place.dto.TravelDetailRes;
import com.ssafy.fullcourse.domain.place.entity.Travel;
import com.ssafy.fullcourse.domain.place.entity.TravelTag;
import com.ssafy.fullcourse.domain.place.repository.TravelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class TravelServiceImpl implements TravelService {

    @Autowired
    TravelRepository travelRepository;
    @Override
    public Page<PlaceRes> travelList(ListReq listReq, Pageable pageable) throws Exception {
        Page<Travel> page = travelRepository.findByTravelTags(new TravelTag(), pageable);
        return page.map(PlaceRes::new);
    }

    @Override
    public TravelDetailRes travelDetail(Long placeId) throws Exception {
        return travelRepository.findByPlaceId(placeId).get().toDetailDto();
    }

    @Override
    @Transactional
    public boolean travelLike(Long placeId) throws Exception {
        return false;
    }
}
