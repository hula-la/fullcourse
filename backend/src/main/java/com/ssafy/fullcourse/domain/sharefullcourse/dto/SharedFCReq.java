package com.ssafy.fullcourse.domain.sharefullcourse.dto;

import com.ssafy.fullcourse.domain.fullcourse.entity.FullCourse;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SharedFCReq {

    @ApiModelProperty(name = "풀코스 아이디", example = "1")
    private Long fcId;
    @ApiModelProperty(name = "공유 풀코스 상세 내용", example = "영진 국밥 맛나요")
    private String detail;
    @ApiModelProperty(name = "공유 풀코스 제목", example = "부산 먹방 풀코스")
    private String title;
    @ApiModelProperty(name = "공유 풀코스 썸네일 이미지 url", example = "img url")
    private String thumbnail;
    @ApiModelProperty(name = "공유 풀코스 일수", example = "2")
    private int day;
    @ApiModelProperty(name = "공유 풀코스 태그", example = "['먹방','부산','바다']")
    private List<String> tags;


}
