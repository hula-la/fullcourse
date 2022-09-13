package com.ssafy.fullcourse.domain.fullcourse.entity;

import com.ssafy.fullcourse.domain.place.repository.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
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

    @Column(nullable = false)
    private Date regDate;

    @Column(nullable = false)
    private Date startDate;

    @Column(nullable = false)
    private Date endDate;

    @Column(nullable = false, length = 100)
    private String thumbnail;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "userId")
    private User user;

    @Builder.Default
    @OneToMany(mappedBy = "fullCourse", cascade = CascadeType.REMOVE)
    private List<FullCourseDetail> fullCourseDetails = new ArrayList<>();
}
