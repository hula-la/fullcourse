package com.ssafy.fullcourse.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Travel {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long travelId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String gugun;

    @Column(nullable = false)
    private Float lat;

    @Column(nullable = false)
    private Float lng;

    @Column(nullable = false)
    private String title;

    private String subtitle;

    private String address;

    private String tel;

    private String url;

    private String transport;

    private String openDay;

    private String fee;

    private String facilities;

    @Column(nullable = false)
    private String imgUrl;

    @Column(nullable = false)
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
