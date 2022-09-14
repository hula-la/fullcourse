package com.ssafy.fullcourse.domain.sharefullcourse.dto;

import lombok.Getter;

@Getter
public class SharedFCCommentReq {
    private String comment;
    private Long sharedFcId;
}
