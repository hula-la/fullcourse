package com.ssafy.fullcourse.domain.place.entity;

import com.ssafy.fullcourse.domain.review.restaurant.entity.RestaurantReview;
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

    @Column(nullable = false, length = 50)
    private String name;

    @Column(nullable = false, length = 100)
    private String address;

    @Column(nullable = false)
    private Float lat;

    @Column(nullable = false)
    private Float lng;

    @Column(length = 20)
    private String tel;

    @Column(nullable = false, length = 20)
    private String category; // 카테고리

    @Column(nullable = false, length = 500)
    private String intro; // 소개

    @Column(length = 20)
    private String holiday;

    @Column(length = 20)
    private String openTime;

    @Column(length = 100)
    private String url; // 홈페이지

    @Column(nullable = false)
    private Float stgScore; // 수용태세지수

    @Column(length = 50)
    private String award; // 어워드

    private Float naverScore;

    @Column(length = 100)
    private String imgUrl;

    @Column(nullable = false)
    private Long addedCnt;

    @Column(nullable = false)
    private Long reviewCnt;

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.REMOVE)
    List<RestaurantReview> reviews = new ArrayList<>();
}
