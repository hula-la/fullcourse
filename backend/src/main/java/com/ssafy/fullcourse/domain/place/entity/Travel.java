package com.ssafy.fullcourse.domain.place.entity;

import com.ssafy.fullcourse.domain.place.dto.TravelDetailRes;
import com.ssafy.fullcourse.domain.place.entity.baseentity.BasePlace;
import com.ssafy.fullcourse.domain.review.entity.TravelReview;
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
public class Travel extends BasePlace {
    @Column(nullable = false, length = 30)
    private String name;

    @Column(length = 20)
    private String gugun;

    @Column(nullable = false)
    private Float lat;

    @Column(nullable = false)
    private Float lng;

    @Column(nullable = false, length = 30)
    private String title;

    @Column(length = 100)
    private String subtitle;

    @Column(length = 100)
    private String address;

    @Column(length = 100)
    private String tel;

    @Column(length = 100)
    private String url;

    @Column(length = 200)
    private String transport;

    @Column(length = 100)
    private String holiday;

    @Column(length = 100)
    private String openTime;

    @Column(length = 100)
    private String fee;

    @Column(length = 100)
    private String facilities;

    @Column(nullable = false, length = 100)
    private String imgUrl;

    @Column(nullable = false, length = 5000)
    private String content;

    @Column(nullable = false)
    private Long addedCnt = 0L;

    @Column(nullable = false)
    private Long reviewCnt = 0L;

    @Column(nullable = false)
    private Long likeCnt = 0L;

    @OneToMany(mappedBy = "place", cascade = CascadeType.REMOVE)
    List<TravelReview> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "travel", cascade = CascadeType.REMOVE)
    List<TravelTag> travelTags = new ArrayList<>();

    @OneToMany(mappedBy = "place", cascade = CascadeType.REMOVE)
    List<TravelLike> likes = new ArrayList<>();

    public TravelDetailRes toDetailDto(){
        TravelDetailRes res = new TravelDetailRes();
        res.setName(this.getName());
        res.setFee(this.getFee());
        res.setAddress(this.getAddress());
        res.setContent(this.getContent());
        res.setGugun(this.getGugun());
        res.setFacilities(this.getFacilities());
        res.setHoliday(this.getHoliday());
        res.setOpenTime(this.getOpenTime());
        res.setTel(this.getTel());
        res.setLat(this.getLat());
        res.setLng(this.getLng());
        res.setUrl(this.getUrl());
        res.setTitle(this.getTitle());
        res.setSubtitle(this.getSubtitle());
        res.setReviewCnt(this.getReviewCnt());
        res.setAddedCnt(this.getAddedCnt());
        res.setLikeCnt(this.getLikeCnt());
        res.setTransport(this.getTransport());
        res.setImgUrl(this.getImgUrl());
        return res;
    }

}
