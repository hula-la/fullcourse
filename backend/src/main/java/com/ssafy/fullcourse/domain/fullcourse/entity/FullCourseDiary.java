package com.ssafy.fullcourse.domain.fullcourse.entity;


import com.ssafy.fullcourse.domain.fullcourse.dto.FullCourseDiaryRes;
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
public class FullCourseDiary {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fcDiaryId;

    @Column
    private String img;

    @Column
    private String content;

    @OneToOne
    @JoinColumn(name="fc_detail_id")
    private FullCourseDetail fullCourseDetail;

    public FullCourseDiaryRes toDto(){
        return FullCourseDiaryRes.builder()
                .fcDairyId(this.fcDiaryId)
                .fcDetailID(this.fullCourseDetail.getFcDetailId())
                .content(this.content)
                .img(this.img)
                .build();
    }

}
