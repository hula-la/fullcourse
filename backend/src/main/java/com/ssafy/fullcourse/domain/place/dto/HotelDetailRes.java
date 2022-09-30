package com.ssafy.fullcourse.domain.place.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class HotelDetailRes {
    private String name;
    private String sido;
    private String gugun;
    private Float lat;
    private Float lng;
    private String url;
    private String tel;
    private Long addedCnt;
    private Long reviewCnt;
    private Long likeCnt;
    private Boolean isLiked;
    private Float reviewScore;
}
