package com.ssafy.fullcourse.domain.place.entity;

import com.ssafy.fullcourse.domain.place.entity.baseentity.BaseLike;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;

@Entity
@NoArgsConstructor
@SuperBuilder
public class ActivityLike extends BaseLike <Activity> {
}
