package com.ssafy.fullcourse.domain.place.dto;

import lombok.Setter;

@Setter
public class PlaceRes {
    Long placeId;
    String name;
    Float lat;
    Float lng;
    String imgUrl;
    Long reviewCnt;
    Long likeCnt;
}
