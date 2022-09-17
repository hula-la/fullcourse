package com.ssafy.fullcourse.domain.fullcourse.entity;

import com.ssafy.fullcourse.domain.fullcourse.dto.FullCourseDetailPostReq;
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
    private Integer courseOrder;

    @Column(nullable = false, length = 20)
    private String type;

    @Column(nullable = false)
    private Long placeId;

    @Column
    private String img;

    @Column
    private String comment;

    @Column(nullable = false)
    private boolean isVisited;


    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "fcId")
    private FullCourse fullCourse;

    public FullCourseDetailPostReq toDto(){
        return FullCourseDetailPostReq.builder()
                .courseOrder(this.courseOrder)
                .type(this.type)
                .placeId(this.placeId)
                .img(this.img)
                .comment(comment)
                .isVisited(isVisited)
                .build();
    }


}
