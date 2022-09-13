package com.ssafy.fullcourse.domain.place.entity;

import com.ssafy.fullcourse.domain.place.repository.user.entity.User;
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
public class TravelTagCnt {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long TravelTagCntId;

    @Column(nullable = false)
    private Long clickCnt;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "travelTagId")
    private TravelTag travelTag;

}
