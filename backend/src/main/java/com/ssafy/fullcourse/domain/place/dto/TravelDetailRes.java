package com.ssafy.fullcourse.domain.place.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;

@Setter
@Getter
@ToString
public class TravelDetailRes {
    private String name;
    private String gugun;
    private Float lat;
    private Float lng;
    private String title;
    private String subtitle;
    private String address;
    private String tel;
    private String url;
    private String transport;
    private String openDay;
    private String fee;
    private String facilities;
    private String imgUrl;
    private String content;
    private Long addedCnt;
    private Long reviewCnt;
    private Long likeCnt;
}
