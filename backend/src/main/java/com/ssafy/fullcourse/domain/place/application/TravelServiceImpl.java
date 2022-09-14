package com.ssafy.fullcourse.domain.place.application;

import com.ssafy.fullcourse.domain.place.dto.ListReq;
import com.ssafy.fullcourse.domain.place.entity.Travel;
import com.ssafy.fullcourse.domain.place.repository.TravelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TravelServiceImpl implements TravelService {

    @Autowired
    TravelRepository travelRepository;
    @Override
    public List<Travel> travelList(ListReq listReq) throws Exception {
        travelRepository.findAll();
        return null;
    }

    @Override
    public Travel travelDetail(Long placeId) throws Exception {
        return travelRepository.findByPlaceId(placeId);
    }

    @Override
    public boolean travelLike(Long placeId) throws Exception {
        return false;
    }
}
