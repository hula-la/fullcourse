package com.ssafy.fullcourse.domain.place.dto;

import lombok.Setter;

@Setter
public class ActivityDetailRes {
    private String name;
    private String subtitle;
    private Float lat;
    private Float lng;
    private String tel;
    private String gugun;
    private String place;
    private String imgUrl;
    private String holiday;
    private String content;
    private String openTime;
    private String transport;
    private Long addedCnt;
    private Long reviewCnt;
    private Long likeCnt;
}