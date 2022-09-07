package com.ssafy.fullcourse.domain.place.entity;

import com.ssafy.fullcourse.domain.review.activity.entity.ActivityReview;
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
public class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long activityId;

    @Column(nullable = false, length = 30)
    private String name;

    @Column(length = 100)
    private String subtitle;

    @Column(nullable = false)
    private Float lat;

    @Column(nullable = false)
    private Float lng;

    @Column(length = 20)
    private String tel;

    @Column(nullable = false, length = 20)
    private String gugun;

    @Column(nullable = false, length = 30)
    private String place;

    @Column(nullable = false,length = 100)
    private String activityImg;

    @Column(length = 30)
    private String holiday;

    @Column(length = 30)
    private String openTime;

    @Column(length = 200)
    private String transport;

    @Column(nullable = false)
    private Long addedCnt;

    @Column(nullable = false)
    private Long reviewCnt;

    @OneToMany(mappedBy = "activity", cascade = CascadeType.REMOVE)
    List<ActivityReview> reviews = new ArrayList<>();
}
