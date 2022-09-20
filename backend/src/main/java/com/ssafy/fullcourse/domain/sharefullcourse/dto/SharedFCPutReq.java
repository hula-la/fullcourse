package com.ssafy.fullcourse.domain.sharefullcourse.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SharedFCPutReq {

    private Long fcId;
    private Long sharedFcId;
    private String detail;
    private String title;
    private String thumbnail;
    private List<String> tags;

}
