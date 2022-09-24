package com.ssafy.fullcourse.domain.sharefullcourse.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SharedFCCommentReq {

    @ApiModelProperty(name = "댓글 내용", example = "풀코스 따봉 드립니다.")
    private String comment;
    @ApiModelProperty(name = "공유풀코스id", example = "1")
    private Long sharedFcId;

}
