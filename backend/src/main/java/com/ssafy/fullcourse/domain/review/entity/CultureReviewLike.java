package com.ssafy.fullcourse.domain.review.entity;

import com.ssafy.fullcourse.domain.review.entity.baseentity.BaseReviewLike;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@SuperBuilder
public class CultureReviewLike extends BaseReviewLike<CultureReview> {
}
