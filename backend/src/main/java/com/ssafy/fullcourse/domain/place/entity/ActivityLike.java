package com.ssafy.fullcourse.domain.place.entity;

import com.ssafy.fullcourse.domain.place.entity.baseentity.BaseLike;
import com.ssafy.fullcourse.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import net.bytebuddy.implementation.bind.annotation.Super;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@NoArgsConstructor
@SuperBuilder
public class ActivityLike extends BaseLike <Activity> {
    public ActivityLike(User user, Activity activity){
        this.setUser(user);
        this.setPlace(activity);
    }
}
