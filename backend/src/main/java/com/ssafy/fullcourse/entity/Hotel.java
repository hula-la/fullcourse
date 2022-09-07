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
public class Hotel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long hotelId;

    @Column(nullable = false, length = 30)
    private String name;
    @Column(nullable = false, length = 20)
    private String sido;

    @Column(nullable = false, length = 20)
    private String gugun;

    @Column(nullable = false)
    private Float lat;

    @Column(nullable = false)
    private Float lng;

    @Column(length = 100)
    private String url;

    @Column(length = 20)
    private String tel;

    @Column(nullable = false)
    private Long addedCnt;

    @Column(nullable = false)
    private Long reviewCnt;

    @OneToMany(mappedBy = "hotel", cascade = CascadeType.REMOVE)
    List<HotelReview> reviews = new ArrayList<>();
}
