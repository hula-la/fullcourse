package com.ssafy.fullcourse.domain.fullcourse.dto;

import com.ssafy.fullcourse.domain.fullcourse.entity.FullCourse;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Date;

@Getter
@ApiModel("FullCourseRes")
@AllArgsConstructor
public class FullCourseRes {
    @ApiModelProperty(name="풀코스 식별자", example="1")
    Long fcId;

    @ApiModelProperty(name="등록 날짜", example="2022-07-06")
    Date regDate;

    @ApiModelProperty(name="시작일", example="2022-08-08")
    Date startDate;

    @ApiModelProperty(name="종료일", example="2022-08-11")
    Date endDate;

    @ApiModelProperty(name="썸네일", example="url")
    String thumbnail;

    public FullCourseRes(FullCourse fullCourse) {
        this.fcId = fullCourse.getFcId();
        this.regDate = fullCourse.getRegDate();
        this.startDate = fullCourse.getStartDate();
        this.endDate = fullCourse.getEndDate();
        this.thumbnail = fullCourse.getThumbnail();
    }




}
