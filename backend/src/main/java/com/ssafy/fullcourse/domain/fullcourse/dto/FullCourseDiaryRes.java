package com.ssafy.fullcourse.domain.fullcourse.dto;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@ApiModel("FullCourseDiaryPostReq")
public class FullCourseDiaryRes {

    @ApiModelProperty(name="장소 기록 id", example="1")
    Long fcDairyId;
    @ApiModelProperty(name="풀코스 디테일 id", example="1")
    Long fcDetailID;
    @ApiModelProperty(name="장소 기록 이미지 url", example="1")
    String img;
    @ApiModelProperty(name="장소 기록 내용", example="재밌어따")
    String content;

}