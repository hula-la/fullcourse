package com.ssafy.fullcourse.domain.review.entity;

import com.ssafy.fullcourse.domain.place.entity.Activity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class ActivityReview extends BaseReview<Activity> {
//    @ManyToOne(fetch = LAZY)
//    @JoinColumn(name = "activityId")
//    private Activity activity;

    @Builder.Default
    @OneToMany(mappedBy = "review", cascade = CascadeType.REMOVE)
    List<ActivityReviewLike> reviewLikes = new ArrayList<>();

}
