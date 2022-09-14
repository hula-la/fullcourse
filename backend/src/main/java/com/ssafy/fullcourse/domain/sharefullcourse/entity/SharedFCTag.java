package com.ssafy.fullcourse.domain.sharefullcourse.entity;

import lombok.*;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SharedFCTag {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fcTagId;

    @Column(nullable = false, length = 30)
    private String tagContent;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "sharedFcId")
    private SharedFullCourse sharedFullCourse;

    public void setSharedFullCourse(SharedFullCourse sharedFullCourse){
        this.sharedFullCourse = sharedFullCourse;
    }
}
