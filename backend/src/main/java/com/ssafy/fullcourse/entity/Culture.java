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

    @Column(nullable = true)
    private String gugun;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String day;

    @Column(nullable = true)
    private String content;

    @Column(nullable = true)
    private String imgUrl;

    @Column(nullable = true)
    private Long count;

    @OneToMany(mappedBy = "CultureReview")
    List<CultureReview> reviews = new ArrayList<>();
}
