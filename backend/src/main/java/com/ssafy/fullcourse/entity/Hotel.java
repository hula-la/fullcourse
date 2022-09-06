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

    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String sido;

    @Column(nullable = false)
    private String gugun;

    @Column(nullable = false)
    private Float lat;

    @Column(nullable = false)
    private Float lng;

    private String url;

    private String tel;

    @Column(nullable = false)
    private Long count;

    @OneToMany(mappedBy = "hotel", cascade = CascadeType.REMOVE)
    List<HotelReview> reviews = new ArrayList<>();
}
