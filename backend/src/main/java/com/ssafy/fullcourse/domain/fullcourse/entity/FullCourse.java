package com.ssafy.fullcourse.domain.fullcourse.entity;

import com.ssafy.fullcourse.domain.fullcourse.dto.FullCourseDetailRes;
import com.ssafy.fullcourse.domain.fullcourse.dto.FullCourseTotalRes;
import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFullCourse;
import com.ssafy.fullcourse.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FullCourse {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fcId;

    @DateTimeFormat(pattern = "yyyy-MM-DD")
    @Column(nullable = false)
    private Date regDate;

    @DateTimeFormat(pattern = "yyyy-MM-DD")
    @Column(nullable = false)
    private Date startDate;

    @DateTimeFormat(pattern = "yyyy-MM-DD")
    @Column(nullable = false)
    private Date endDate;

    @Column(nullable = true, length = 100)
    private String thumbnail;

    @Column(nullable = false)
    private boolean isShared = false;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "userId")
    private User user;

    @OneToMany(mappedBy = "fullCourse", cascade = CascadeType.REMOVE)
    private List<FullCourseDetail> fullCourseDetails = new ArrayList<>();

    @OneToOne(mappedBy = "fullCourse", cascade = CascadeType.REMOVE)
    private SharedFullCourse sharedFullCourse;

    public FullCourseTotalRes toDto(HashMap<Integer, List<FullCourseDetailRes>> places){
        return FullCourseTotalRes.builder()
                .userId(this.user.getUserId())
                .regDate(this.regDate)
                .startDate(this.startDate)
                .endDate(this.endDate)
                .thumbnail(this.thumbnail)
                .isShared(this.isShared)
                .places(places)
                .build();
    }

    public void updateShared(boolean state){
        this.isShared = state;
    }
}
