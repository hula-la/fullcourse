package com.ssafy.fullcourse.domain.fullcourse.dto;

import com.ssafy.fullcourse.domain.fullcourse.entity.FullCourse;
import com.ssafy.fullcourse.domain.fullcourse.entity.FullCourseDetail;
import com.ssafy.fullcourse.domain.place.dto.PlaceRes;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
@ApiModel("FullCourseDetailPostReq")
@Builder
public class FullCourseDetailRes {

    @ApiModelProperty(name="순서", example="0")
    int courseOrder;

    @ApiModelProperty(name = "FCDetailId", example = "0")
    Long fcdId;

    @ApiModelProperty(name="장소 종류", example="activity")
    String type;

    @ApiModelProperty(name="장소 식별자", example="1")
    Long placeId;

    @ApiModelProperty(name="이미지", example="url")
    String img;

    @ApiModelProperty(name="기록", example="url")
    String comment;

    @ApiModelProperty(name="방문 여부", example="true")
    boolean isVisited;

    @ApiModelProperty(name="장소 정보", example="")
    PlaceRes place;

    public FullCourseDetail toEntity(FullCourse fullCourse,int day){
        return FullCourseDetail.builder()
                .day(day)
                .courseOrder(this.courseOrder)
                .type(this.type)
                .placeId(this.placeId)
                .fullCourse(fullCourse)
                .img(this.img)
                .comment(this.comment)
                .isVisited(this.isVisited)
                .build();
    }

}
