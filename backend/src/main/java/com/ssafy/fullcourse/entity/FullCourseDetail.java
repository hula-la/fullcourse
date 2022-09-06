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
public class FullCourseDetail {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fcDetailId;

    @Column(nullable = false, length = 3)
    private Integer day;

    @Column(nullable = false, length = 3)
    private Integer order;

    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private Long placeId;
}
