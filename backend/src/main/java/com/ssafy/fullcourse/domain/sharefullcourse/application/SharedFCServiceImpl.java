package com.ssafy.fullcourse.domain.sharefullcourse.application;

import com.ssafy.fullcourse.domain.sharefullcourse.dto.SharedFCDto;
import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFullCourse;
import com.ssafy.fullcourse.domain.sharefullcourse.mapper.SharedFCMapper;
import com.ssafy.fullcourse.domain.sharefullcourse.repository.SharedFCRepository;
import com.ssafy.fullcourse.domain.sharefullcourse.repository.SharedFCTagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;


@Service
public class SharedFCServiceImpl implements SharedFCService{

    @Autowired
    SharedFCRepository sharedFCRepository;
    @Autowired
    SharedFCTagRepository sharedFCTagRepository;

    @Override
    public SharedFullCourse detailSharedFC(Long sharedFcId) {
        Optional<SharedFullCourse> opt = Optional.ofNullable(sharedFCRepository.findBySharedFcId(sharedFcId));
        SharedFullCourse sharedFullCourse = opt.orElseThrow(NullPointerException::new);
        System.out.println(">>" + sharedFullCourse.toString());
        return sharedFullCourse;

    }

    @Override
    public SharedFullCourse createSharedFC(SharedFCDto sharedFCDto, List<String> tags) {
        SharedFullCourse sharedFullCourse = SharedFCMapper.MAPPER.toEntity(sharedFCDto);
        SharedFullCourse saved = sharedFCRepository.save(sharedFullCourse);

        return sharedFCRepository.save(sharedFullCourse);
    }


}
