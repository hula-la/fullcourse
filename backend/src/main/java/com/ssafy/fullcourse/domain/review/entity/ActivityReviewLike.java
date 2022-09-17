package com.ssafy.fullcourse.domain.review.entity;

import com.ssafy.fullcourse.domain.review.entity.baseentity.BaseReviewLike;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@SuperBuilder
public class ActivityReviewLike extends BaseReviewLike<ActivityReview> {

}
