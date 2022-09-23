package com.ssafy.fullcourse.domain.fullcourse.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class FullCourseVisitConfirmReq {
    Long fcDetailId;
    @ApiModelProperty(name="현위치 위도", example="35.123123")
    Float lat;
    @ApiModelProperty(name="현위치 경도", example="128.123123")
    Float lng;
}
