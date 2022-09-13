package com.ssafy.fullcourse.domain.review.entity;

import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
//@Getter
//@AllArgsConstructor
@NoArgsConstructor
public class ActivityReviewLike extends BaseReviewLike<ActivityReview> {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long reviewLikeId;
//
//    @ManyToOne(fetch = LAZY)
//    @JoinColumn(name = "userId")
//    private User user;
//
//    @ManyToOne(fetch = LAZY)
//    @JoinColumn(name = "reviewId")
//    private ActivityReview review;
}
