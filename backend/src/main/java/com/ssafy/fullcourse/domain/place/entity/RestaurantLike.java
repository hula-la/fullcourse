package com.ssafy.fullcourse.domain.place.entity;

import com.ssafy.fullcourse.domain.place.entity.baseentity.BaseLike;
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
public class RestaurantLike extends BaseLike {
    public RestaurantLike(User user, Restaurant restaurant){
        this.setUser(user);
        this.setPlace(restaurant);
    }
}
