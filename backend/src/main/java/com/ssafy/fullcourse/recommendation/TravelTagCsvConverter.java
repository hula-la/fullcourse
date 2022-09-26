package com.ssafy.fullcourse.recommendation;

import com.ssafy.fullcourse.domain.place.entity.Travel;
import com.ssafy.fullcourse.domain.place.entity.TravelTag;
import com.ssafy.fullcourse.domain.place.repository.TravelRepository;
import com.ssafy.fullcourse.domain.place.repository.TravelTagRepository;
import com.ssafy.fullcourse.global.model.Tag;
import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.List;

@RequiredArgsConstructor
public class TravelTagCsvConverter {
    private final TravelRepository travelRepository;

    public void converter() {
        List<Travel> travelList = travelRepository.findAll();

        // 태그 리스트 생성 및 객체 변환
        HashMap<String, Integer> tagMap = new HashMap<>();
        Tag[] values = Tag.values();
        for (int i = 0; i < values.length; i++) {
            tagMap.put(values[i].toString(),i);
        }



    }
}
