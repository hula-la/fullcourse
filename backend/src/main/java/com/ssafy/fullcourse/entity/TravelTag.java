package com.ssafy.fullcourse.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TravelTag {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long travelTagId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Tag tagContent;
}
