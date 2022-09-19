package com.ssafy.fullcourse.domain.place.application;

import com.ssafy.fullcourse.domain.place.dto.CustomDetailRes;
import com.ssafy.fullcourse.domain.place.dto.ListReq;
import com.ssafy.fullcourse.domain.place.dto.PlaceRes;
import com.ssafy.fullcourse.domain.place.entity.Custom;
import com.ssafy.fullcourse.domain.place.repository.CustomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomServiceImpl implements CustomService{

    private final CustomRepository customRepository;

    @Override
    public Page<PlaceRes> getCustomList(ListReq listReq, Pageable pageable) throws Exception {
        Page<Custom> page = customRepository.findAll(pageable);
        return page.map(PlaceRes::new);
    }

    @Override
    public CustomDetailRes getCustomDetail(Long placeId) throws Exception {
        return customRepository.findByPlaceId(placeId).get().toDetailDto();
    }

    @Override
    public Long createCustom(Long placeId, Long userId) throws Exception {
        return 1L;
    }
}
