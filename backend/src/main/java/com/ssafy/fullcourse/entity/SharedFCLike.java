package com.ssafy.fullcourse.entity;

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
public class SharedFCLike {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fcLikeId;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "userId")
    private User user;
}
