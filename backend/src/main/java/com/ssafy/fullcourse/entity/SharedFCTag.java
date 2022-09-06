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
public class SharedFCTag {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fcTagId;

    @Column(nullable = false)
    private String tagContent;
}
