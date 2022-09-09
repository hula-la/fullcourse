package com.ssafy.fullcourse.domain.sharefullcourse.dto;

import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFullCourse;
import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SharedFCTagDto {

    private String tagContent;
    private SharedFullCourse sharedFullCourse;
}
