package com.ssafy.fullcourse.domain.sharefullcourse.application;


import com.ssafy.fullcourse.domain.sharefullcourse.dto.SharedFCDto;
import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFullCourse;

import java.util.List;
import java.util.Optional;

public interface SharedFCService {

    SharedFullCourse createSharedFC(SharedFCDto sharedFCDto, List<String> tags);
    SharedFullCourse detailSharedFC(Long sharedFcId);

}
