package com.ssafy.fullcourse.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ActivityReview {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    @Column(nullable = false, length = 500)
    private String content;

    @Column(length = 100)
    private String reviewImg;

    @Column(nullable = false)
    private Float score;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "activityId")
    private Activity activity;
}
