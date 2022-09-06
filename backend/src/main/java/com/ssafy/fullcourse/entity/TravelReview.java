package com.ssafy.fullcourse.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TravelReview {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long travelId;

    private String reviewImg;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private Float score;

}
