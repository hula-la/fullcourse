package com.ssafy.fullcourse.domain.sharefullcourse.dto;

import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFCTag;
import lombok.*;

import java.util.Date;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SharedFCDto {

    private String detail;
    private String title;
    private Date regDate;
    @Builder.Default private Long likeCnt = 0l;
    @Builder.Default private Long commentCnt = 0l;
    @Builder.Default private Long viewCnt = 0l;
    private List<SharedFCTag> sharedFCTags;
    private String thumbnail;

}
