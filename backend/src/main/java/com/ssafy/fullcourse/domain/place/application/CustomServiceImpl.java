package com.ssafy.fullcourse.domain.place.application;

import com.ssafy.fullcourse.domain.place.dto.CreateCustomReq;
import com.ssafy.fullcourse.domain.place.dto.CustomDetailRes;
import com.ssafy.fullcourse.domain.place.dto.PlaceRes;
import com.ssafy.fullcourse.domain.place.entity.Custom;
import com.ssafy.fullcourse.domain.place.repository.CustomRepository;
import com.ssafy.fullcourse.domain.user.entity.User;
import com.ssafy.fullcourse.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomServiceImpl implements CustomService {
    private final CustomRepository customRepository;
    private final UserRepository userRepository;

    @Override
    public Page<PlaceRes> getCustomList(Pageable pageable, String keyword) throws Exception {
        Page<Custom> page;
        if (keyword.equals("")) {
            page = customRepository.findAll(pageable);
        } else {
            page = customRepository.findByNameContaining(keyword, pageable);
        }
        return page.map(PlaceRes::new);
    }

    @Override
    public CustomDetailRes getCustomDetail(Long placeId) throws Exception {
        return customRepository.findByPlaceId(placeId).get().toDetailDto();
    }

    @Override
    public boolean createCustom(CreateCustomReq createCustomReq) throws Exception {
        User user = userRepository.findById(createCustomReq.getUserId()).get();
        customRepository.save(Custom.builder().user(user).address(createCustomReq.getAddress()).lng(createCustomReq.getLng()).lat(createCustomReq.getLat()).name(createCustomReq.getName()).content(createCustomReq.getContent()).build());

        return true;
    }
}
