package com.ssafy.fullcourse.domain.fullcourse.dto;

import com.ssafy.fullcourse.domain.fullcourse.entity.FullCourse;
import com.ssafy.fullcourse.domain.fullcourse.entity.FullCourseDetail;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
@ApiModel("FullCourseDetailPostReq")
@Builder
public class FullCourseDetailPostReq {



    @ApiModelProperty(name="순서", example="0")
    int courseOrder;

    @ApiModelProperty(name="장소 종류", example="ACTIVITY")
    String type;

    @ApiModelProperty(name="장소 식별자", example="1")
    Long placeId;

    public FullCourseDetail toEntity(FullCourse fullCourse,int day){
        return FullCourseDetail.builder()
                .day(day)
                .courseOrder(this.courseOrder)
                .type(this.type)
                .placeId(this.placeId)
                .fullCourse(fullCourse)
                .build();
    }

}
