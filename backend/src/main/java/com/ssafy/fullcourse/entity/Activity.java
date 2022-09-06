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
public class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long activityId;

    @Column(nullable = false)
    private String name;

    private String subtitle;

    @Column(nullable = false)
    private Float lat;

    @Column(nullable = false)
    private Float lng;

    private String tel;

    @Column(nullable = false)
    private String gugun;

    @Column(nullable = false)
    private String place;

    @Column(nullable = false)
    private String activityImg;

    private String holiday;

    private String openTime;

    private String transport;

    private Long count;

    @OneToMany(mappedBy = "ActivityReview")
    List<ActivityReview> reviews = new ArrayList<>();
}
