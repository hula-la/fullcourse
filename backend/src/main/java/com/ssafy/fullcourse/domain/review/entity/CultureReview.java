package com.ssafy.fullcourse.domain.review.entity;

import com.ssafy.fullcourse.domain.place.entity.Culture;
import com.ssafy.fullcourse.domain.review.entity.baseentity.BaseReview;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@DynamicInsert
@SuperBuilder
public class CultureReview extends BaseReview<Culture> {


    @OneToMany(mappedBy = "review", cascade = CascadeType.REMOVE)
    private List<CultureReviewLike> reviewLikes = new ArrayList<>();


}
