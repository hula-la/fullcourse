package com.ssafy.fullcourse.domain.place.dto;

import com.ssafy.fullcourse.domain.place.entity.*;
import io.swagger.annotations.ApiModel;
import lombok.*;

@Setter
@Getter
@ApiModel("PlaceRes")
@AllArgsConstructor
@NoArgsConstructor
public class PlaceRes {
    Long placeId;
    String name;
    Float lat;
    Float lng;
    String imgUrl;
    Long reviewCnt;
    Long likeCnt;
    Long addedCnt;

    public PlaceRes(Travel place){
        this.placeId = place.getPlaceId();
        this.name = place.getName();
        this.lat = place.getLat();
        this.lng = place.getLng();
        this.imgUrl = place.getImgUrl();
        this.reviewCnt = place.getReviewCnt();
        this.likeCnt = place.getLikeCnt();
        this.addedCnt = place.getAddedCnt();
    }
    public PlaceRes(Activity place){
        this.placeId = place.getPlaceId();
        this.name = place.getName();
        this.lat = place.getLat();
        this.lng = place.getLng();
        this.imgUrl = place.getImgUrl();
        this.reviewCnt = place.getReviewCnt();
        this.likeCnt = place.getLikeCnt();
        this.addedCnt = place.getAddedCnt();
    }
    public PlaceRes(Hotel place){
        this.placeId = place.getPlaceId();
        this.name = place.getName();
        this.lat = place.getLat();
        this.lng = place.getLng();
        this.reviewCnt = place.getReviewCnt();
        this.likeCnt = place.getLikeCnt();
        this.addedCnt = place.getAddedCnt();
    }
    public PlaceRes(Restaurant place){
        this.placeId = place.getPlaceId();
        this.name = place.getName();
        this.lat = place.getLat();
        this.lng = place.getLng();
        this.imgUrl = place.getImgUrl();
        this.reviewCnt = place.getReviewCnt();
        this.likeCnt = place.getLikeCnt();
        this.addedCnt = place.getAddedCnt();
    }
    public PlaceRes(Culture place){
        this.placeId = place.getPlaceId();
        this.name = place.getName();
        this.lat = place.getLat();
        this.lng = place.getLng();
        this.imgUrl = place.getImgUrl();
        this.reviewCnt = place.getReviewCnt();
        this.likeCnt = place.getLikeCnt();
        this.addedCnt = place.getAddedCnt();
    }
    public PlaceRes(Custom place){
        this.placeId = place.getPlaceId();
        this.name = place.getName();
        this.lat = place.getLat();
        this.lng = place.getLng();
    }
}
