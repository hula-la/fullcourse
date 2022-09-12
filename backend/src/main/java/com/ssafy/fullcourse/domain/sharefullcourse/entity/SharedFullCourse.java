package com.ssafy.fullcourse.domain.sharefullcourse.entity;

import com.ssafy.fullcourse.domain.fullcourse.entity.FullCourse;
import lombok.*;

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
@ToString
public class SharedFullCourse {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sharedFcId;

    @Column(length = 500)
    private String detail;

    @Column(nullable = false, length = 50)
    private String title;

    @Column(nullable = false)
    private Date regDate;

    @Column(nullable = false)
    private Long likeCnt;

    @Column(nullable = false)
    private Long commentCnt;

    @Column(nullable = false)
    private Long viewCnt;

    @Column(nullable = false, length = 100)
    private String thumbnail;

    @OneToMany(mappedBy = "sharedFullCourse", cascade = CascadeType.REMOVE)
    private List<SharedFCComment> sharedFCComments = new ArrayList<>();

    @OneToMany(mappedBy = "sharedFullCourse", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SharedFCTag> sharedFCTags = new ArrayList<>();

    @OneToMany(mappedBy = "sharedFullCourse", cascade = CascadeType.REMOVE)
    private List<SharedFCLike> sharedFCLikes = new ArrayList<>();

    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "fcId")
    private FullCourse fullCourse;



}
