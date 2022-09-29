package com.ssafy.fullcourse.recommendation.application;

import com.ssafy.fullcourse.domain.place.application.TravelService;
import com.ssafy.fullcourse.domain.place.dto.PlaceRes;
import com.ssafy.fullcourse.domain.place.dto.TravelDetailRes;
import com.ssafy.fullcourse.domain.place.entity.Travel;
import com.ssafy.fullcourse.domain.place.repository.TravelRepository;
import com.ssafy.fullcourse.domain.review.dto.ReviewRes;
import com.ssafy.fullcourse.global.util.RedisUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.Map.Entry;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class TravelRecommendService {
    private final RedisUtil redisUtil;
    private final TravelRepository travelRepository;
    private final TravelService travelService;

    public List<PlaceRes> randomPlace(){
        List<Travel> randomAll = travelRepository.findRandomAll();
        return randomAll.stream().map(PlaceRes::new).collect(Collectors.toList());
    }

    public TravelDetailRes[] similarPlaceRecommender(long selectedIdx, int num) throws Exception {

        Map<Object, Object> hashEntry = redisUtil.getHashEntry(selectedIdx);


        List<Entry<Object, Object>> list_entries = new ArrayList<Entry<Object, Object>>(hashEntry.entrySet());

        // 비교함수 Comparator를 사용하여 오름차순으로 정렬
        Collections.sort(list_entries, new Comparator<Entry<Object, Object>>() {
            // compare로 값을 비교
            public int compare(Entry<Object, Object> obj1, Entry<Object, Object> obj2) {
                // 오름 차순 정렬
                return -((Float)obj1.getValue()).compareTo((Float)obj2.getValue());
            }
        });

        TravelDetailRes[] topKSimilarPlace = new TravelDetailRes[num];


        topKSimilarPlace[0] = travelRepository.findByPlaceId(selectedIdx).get().toDetailDto();
        int cnt=1;

        for (int i = 0; cnt < num && i<list_entries.size(); i++) {
            long idx = (Long) list_entries.get(i).getKey();
            if (idx!=selectedIdx) {
                System.out.println(cnt);
                topKSimilarPlace[cnt] = travelRepository.findByPlaceId(idx).get().toDetailDto();
                cnt++;
            }
        }

        return topKSimilarPlace;
    }
}
