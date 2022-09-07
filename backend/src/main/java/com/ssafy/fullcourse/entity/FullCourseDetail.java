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
public class FullCourseDetail {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fcDetailId;

    @Column(nullable = false)
    private Integer day;

    @Column(nullable = false)
    private Integer order;

    @Column(nullable = false, length = 20)
    private String type;

    @Column(nullable = false)
    private Long placeId;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "fcId")
    private FullCourse fullCourse;
}
