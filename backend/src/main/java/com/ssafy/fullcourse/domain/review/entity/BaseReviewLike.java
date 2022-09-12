package com.ssafy.fullcourse.domain.review.entity;

import com.ssafy.fullcourse.domain.place.repository.user.entity.User;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@MappedSuperclass
@Getter
@Setter
public class BaseReviewLike<Review extends BaseReview> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewLikeId;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "reviewId")
    private Review review;

}
