package com.ssafy.fullcourse.domain.sharefullcourse.dto;

import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFCTag;
import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SharedFCTagDto {

    private Long fcTagId;
    private String tagContent;
    private Long sharedFcId;

    public SharedFCTagDto(SharedFCTag tag) {
        fcTagId = tag.getFcTagId();
        tagContent = tag.getTagContent();
        sharedFcId = tag.getFcTagId();
    }

}
