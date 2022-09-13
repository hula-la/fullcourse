package com.ssafy.fullcourse.domain.review.entity;

import com.ssafy.fullcourse.domain.place.entity.BasePlace;
import com.ssafy.fullcourse.domain.place.repository.user.entity.User;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

//@DynamicInsert
@MappedSuperclass
@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BaseReview<P extends BasePlace> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    @Column(nullable = false, length = 500)
    private String content;

    @Column(length = 100)
    private String reviewImg;

    @Column(nullable = false)
    private Float score;

    @Column(nullable = false)
    private Long likeCnt;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "placeId")
    private P place;

//    @Builder
//    public BaseReview(String content, String reviewImg, Float score, Long likeCnt,  P place) {
//        this.content = content;
//        this.reviewImg = reviewImg;
//        this.score = score;
//        this.likeCnt = likeCnt;
//        this.place = place;
//    }



}
