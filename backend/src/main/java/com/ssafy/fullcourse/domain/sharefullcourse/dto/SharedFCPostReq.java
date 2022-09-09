package com.ssafy.fullcourse.domain.sharefullcourse.dto;

import lombok.*;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SharedFCPostReq {

    private Long fdId;
    private String detail;
    private String title;
    private String thumbnail;
    private List<String> tags;

}
