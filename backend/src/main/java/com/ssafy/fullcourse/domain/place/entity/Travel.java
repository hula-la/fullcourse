package com.ssafy.fullcourse.domain.place.entity;

import com.ssafy.fullcourse.domain.review.travel.entity.TravelReview;
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
public class Travel {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long travelId;

    @Column(nullable = false, length = 30)
    private String name;

    @Column(nullable = false, length = 20)
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
    private String openDay;

    @Column(length = 100)
    private String fee;

    @Column(length = 100)
    private String facilities;

    @Column(nullable = false, length = 100)
    private String imgUrl;

    @Column(nullable = false, length = 1000)
    private String content;

    @Column(nullable = false)
    private Long addedCnt;

    @Column(nullable = false)
    private Long reviewCnt;

    @OneToMany(mappedBy = "travel", cascade = CascadeType.REMOVE)
    List<TravelReview> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "travel", cascade = CascadeType.REMOVE)
    List<TravelTag> travelTags = new ArrayList<>();

}
