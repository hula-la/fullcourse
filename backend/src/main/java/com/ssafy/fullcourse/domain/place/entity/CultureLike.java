package com.ssafy.fullcourse.domain.place.entity;

import com.ssafy.fullcourse.domain.place.entity.baseentity.BaseLike;
import com.ssafy.fullcourse.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@SuperBuilder
@NoArgsConstructor
public class CultureLike extends BaseLike {
    public CultureLike(User user, Culture culture){
        this.setUser(user);
        this.setPlace(culture);
    }
}
