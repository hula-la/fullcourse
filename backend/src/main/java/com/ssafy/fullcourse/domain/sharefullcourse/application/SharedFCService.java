package com.ssafy.fullcourse.domain.sharefullcourse.application;


import com.ssafy.fullcourse.domain.sharefullcourse.dto.SharedFCDto;
import com.ssafy.fullcourse.domain.sharefullcourse.dto.SharedFCGetRes;
import com.ssafy.fullcourse.domain.sharefullcourse.dto.SharedFCTagDto;
import com.ssafy.fullcourse.domain.user.entity.User;

import java.util.List;

public interface SharedFCService {

    Long createSharedFC(SharedFCDto sharedFCDto, List<SharedFCTagDto> tags);
    SharedFCGetRes detailSharedFC(Long sharedFcId);
    Long updateSharedFC(SharedFCDto sharedFCDto, List<SharedFCTagDto> tags);
    void deleteSharedFC(Long sharedFdId);
    int likeSharedFC(Long sharedId, User user);

}
