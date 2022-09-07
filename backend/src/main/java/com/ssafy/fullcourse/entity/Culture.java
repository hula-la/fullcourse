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
public class Culture {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cultureId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Float lat;

    @Column(nullable = false)
    private Float lng;

    private String gugun;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String day;

    private String content;

    private String imgUrl;

    @Column(nullable = false)
    private Long addedCnt;

    @Column(nullable = false)
    private Long reviewCnt;

    @OneToMany(mappedBy = "culture", cascade = CascadeType.REMOVE)
    List<CultureReview> reviews = new ArrayList<>();
}
