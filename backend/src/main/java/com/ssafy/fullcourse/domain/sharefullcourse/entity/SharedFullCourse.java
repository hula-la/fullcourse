package com.ssafy.fullcourse.domain.sharefullcourse.entity;

import com.ssafy.fullcourse.domain.fullcourse.entity.FullCourse;
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

    @Builder.Default
    @OneToMany(mappedBy = "sharedFullCourse", cascade = CascadeType.REMOVE)
    private List<SharedFCComment> sharedFCComments = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "sharedFullCourse", cascade = CascadeType.REMOVE)
    private List<SharedFCTag> sharedFCTags = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "sharedFullCourse", cascade = CascadeType.REMOVE)
    private List<SharedFCLike> sharedFCLikes = new ArrayList<>();

    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "fcId")
    private FullCourse fullCourse;

}
