package com.ssafy.fullcourse.domain.place.entity;

import com.ssafy.fullcourse.domain.review.culture.entity.CultureReview;
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

    @Column(nullable = false, length = 30)
    private String name;

    @Column(nullable = false)
    private Float lat;

    @Column(nullable = false)
    private Float lng;

    @Column(length = 20)
    private String gugun;

    @Column(nullable = false, length = 50)
    private String address;

    @Column(nullable = false, length = 30)
    private String day;

    @Column(length = 500)
    private String content;

    @Column(length = 100)
    private String imgUrl;

    @Column(nullable = false)
    private Long addedCnt;

    @Column(nullable = false)
    private Long reviewCnt;

    @OneToMany(mappedBy = "culture", cascade = CascadeType.REMOVE)
    List<CultureReview> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "culture", cascade = CascadeType.REMOVE)
    List<CultureLike> likes = new ArrayList<>();
}
