package com.ssafy.fullcourse.domain.place.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CultureDetailRes {
    private String name;
    private Float lat;
    private Float lng;
    private String gugun;
    private String address;
    private String day;
    private String content;
    private String imgUrl;
    private Long addedCnt;
    private Long reviewCnt;
    private Long likeCnt;
}
