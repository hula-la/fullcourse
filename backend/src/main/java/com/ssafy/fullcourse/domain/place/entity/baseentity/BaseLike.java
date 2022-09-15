package com.ssafy.fullcourse.domain.place.entity.baseentity;

import com.ssafy.fullcourse.domain.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@MappedSuperclass
@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
public class BaseLike <P extends BasePlace>{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long likeId;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "placeId")
    private P place;

}
