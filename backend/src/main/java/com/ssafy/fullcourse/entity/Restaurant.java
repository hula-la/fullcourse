package com.ssafy.fullcourse.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Restaurant {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long restaurantId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private Float lat;

    @Column(nullable = false)
    private Float lng;

    private String tel;

    @Column(nullable = false)
    private String category; // 카테고리

    @Column(nullable = false)
    private String intro; // 소개

    private String holiday;

    private String openTime;

    private String url; // 홈페이지

    @Column(nullable = false)
    private Float stgScore; // 수용태세지수

    private String award; // 어워드

    private Float naverScore;

    private String imgUrl;

    @Column(nullable = false)
    private Long addedCnt;

    @Column(nullable = false)
    private Long reviewCnt;

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.REMOVE)
    List<RestaurantReview> reviews = new ArrayList<>();
}
