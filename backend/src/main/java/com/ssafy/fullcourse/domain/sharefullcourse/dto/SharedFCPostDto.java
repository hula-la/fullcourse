package com.ssafy.fullcourse.domain.sharefullcourse.dto;

import com.ssafy.fullcourse.domain.fullcourse.dto.FullCourseRes;
import lombok.*;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SharedFCPostDto {
    private List<SharedFCListDto> sharedFCList;
    private List<FullCourseRes> FCList;

//    public SharedFCPostDto(List<SharedFCListDto> sharedFCList, List<FullCourseRes> FCList) {
//        this.sharedFCList = sharedFCList;
//        this.FCList = FCList;
//    }
}
