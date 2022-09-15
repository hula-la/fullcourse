package com.ssafy.fullcourse.domain.fullcourse.dto;

import com.ssafy.fullcourse.domain.fullcourse.entity.FullCourse;
import com.ssafy.fullcourse.domain.user.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.HashMap;
import java.util.List;

@Getter
@Setter
@ApiModel("FullCoursePostReq")
public class FullCoursePostReq {

    @ApiModelProperty(name="등록 날짜", example="2022-07-06")
    Date regDate;

    @ApiModelProperty(name="시작일", example="2022-08-08")
    Date startDate;

    @ApiModelProperty(name="종료일", example="2022-08-11")
    Date endDate;

    @ApiModelProperty(name="썸네일", example="url")
    String thumbnail;

    HashMap<Integer, List<FullCourseDetailPostReq>> places;

    public FullCourse toEntity(User user){
        return FullCourse.builder()
                .user(user)
                .regDate(this.regDate)
                .startDate((this.startDate))
                .endDate(this.endDate)
                .thumbnail(this.thumbnail)
                .build();
    }
}
