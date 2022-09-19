package com.ssafy.fullcourse.domain.place.entity;

import com.ssafy.fullcourse.domain.place.dto.RestaurantDetailRes;
import com.ssafy.fullcourse.domain.place.entity.baseentity.BasePlace;
import com.ssafy.fullcourse.domain.review.entity.RestaurantReview;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Restaurant extends BasePlace {
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

    @Column(length = 20)
    private String category; // 카테고리

    @Column(nullable = false, length = 5000)
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
    private Long addedCnt = 0L;

    @Column(nullable = false)
    private Long reviewCnt = 0L;

    @Column(nullable = false)
    private Long likeCnt = 0L;

    @OneToMany(mappedBy = "place", cascade = CascadeType.REMOVE)
    List<RestaurantReview> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "place", cascade = CascadeType.REMOVE)
    List<RestaurantLike> likes = new ArrayList<>();


    public RestaurantDetailRes toDetailDto(){
        RestaurantDetailRes res = new RestaurantDetailRes();
        res.setName(this.getName());
        res.setAddress(this.getAddress());
        res.setLat(this.getLat());
        res.setLng(this.getLng());
        res.setTel(this.getTel());
        res.setCategory(this.getCategory());
        res.setIntro(this.getIntro());
        res.setHoliday(this.getHoliday());
        res.setOpenTime(this.getOpenTime());
        res.setUrl(this.getUrl());
        res.setStgScore(this.getStgScore());
        res.setAward(this.getAward());
        res.setNaverScore(this.getNaverScore());
        res.setImgUrl(this.getImgUrl());
        res.setAddedCnt(this.getAddedCnt());
        res.setReviewCnt(this.getReviewCnt());
        res.setLikeCnt(this.getLikeCnt());
        return res;
    }

}
