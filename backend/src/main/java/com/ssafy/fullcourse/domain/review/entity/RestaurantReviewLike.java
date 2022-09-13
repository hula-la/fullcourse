package com.ssafy.fullcourse.domain.review.entity;

import com.ssafy.fullcourse.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RestaurantReviewLike extends BaseReviewLike<CultureReview>{


}
