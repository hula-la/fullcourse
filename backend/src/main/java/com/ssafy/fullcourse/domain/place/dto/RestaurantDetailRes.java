package com.ssafy.fullcourse.domain.place.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RestaurantDetailRes {
    private String name;
    private String address;
    private Float lat;
    private Float lng;
    private String tel;
    private String category; // 카테고리
    private String intro; // 소개
    private String holiday;
    private String openTime;
    private String url; // 홈페이지
    private Float stgScore; // 수용태세지수
    private String award; // 어워드
    private Float naverScore;
    private String imgUrl;
    private Long addedCnt;
    private Long reviewCnt;
    private Long likeCnt;
    private Boolean isLiked;
    private Float reviewScore;
}
