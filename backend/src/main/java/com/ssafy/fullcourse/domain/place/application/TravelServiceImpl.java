package com.ssafy.fullcourse.domain.place.application;

import com.ssafy.fullcourse.domain.place.dto.ListReq;
import com.ssafy.fullcourse.domain.place.dto.PlaceRes;
import com.ssafy.fullcourse.domain.place.entity.Travel;
import com.ssafy.fullcourse.domain.place.repository.TravelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
public class TravelServiceImpl implements TravelService {

    @Autowired
    TravelRepository travelRepository;
    @Override
    public List<PlaceRes> travelList(ListReq listReq) throws Exception {
        List<Travel> tList = travelRepository.findAll();
        List<PlaceRes> trList = new ArrayList<>();
        for(Travel travel : tList){
            trList.add(travel.toDto());
        }
        return trList;
    }

    @Override
    public Travel travelDetail(Long placeId) throws Exception {
        return travelRepository.findByPlaceId(placeId);
    }

    @Override
    @Transactional
    public boolean travelLike(Long placeId) throws Exception {
        return false;
    }
}
