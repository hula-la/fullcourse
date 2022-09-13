package com.ssafy.fullcourse.domain.review.entity;

import com.ssafy.fullcourse.domain.place.entity.Culture;
import com.ssafy.fullcourse.domain.place.entity.Restaurant;
import com.ssafy.fullcourse.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@DynamicInsert
@SuperBuilder
public class RestaurantReview extends BaseReview<Restaurant>{

    @Builder.Default
    @OneToMany(mappedBy = "review", cascade = CascadeType.REMOVE)
    private List<RestaurantReviewLike> reviewLikes = new ArrayList<>();
}
