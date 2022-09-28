package com.ssafy.fullcourse.domain.fullcourse.entity;

import com.ssafy.fullcourse.domain.fullcourse.dto.FullCourseDetailRes;
import com.ssafy.fullcourse.domain.place.dto.PlaceRes;
import lombok.*;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Setter
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
    private boolean isVisited = false;


    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "fcId")
    private FullCourse fullCourse;

    @OneToOne(mappedBy = "fullCourseDetail", cascade = CascadeType.REMOVE)
    private FullCourseDiary fullCourseDiary;

    public FullCourseDetailRes toDto(PlaceRes place){
        return FullCourseDetailRes.builder()
                .courseOrder(this.courseOrder)
                .fcdId(this.fcDetailId)
                .type(this.type)
                .placeId(this.placeId)
                .img(this.img)
                .comment(comment)
                .isVisited(isVisited)
                .place(place)
                .build();
    }


}
