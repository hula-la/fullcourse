package com.ssafy.fullcourse.domain.review.culture.entity;

import com.ssafy.fullcourse.domain.place.entity.Culture;
import com.ssafy.fullcourse.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CultureReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    @Column(length = 100)
    private String reviewImg;

    @Column(nullable = false, length = 500)
    private String content;

    @Column(nullable = false)
    private Float score;

    @Column(nullable = false)
    private Long likeCnt;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "cultureId")
    private Culture culture;

    @OneToMany(mappedBy = "review", cascade = CascadeType.REMOVE)
    private List<CultureReviewLike> reviewLikes = new ArrayList<>();
}
