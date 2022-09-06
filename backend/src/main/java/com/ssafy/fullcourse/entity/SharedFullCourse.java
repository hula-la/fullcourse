package com.ssafy.fullcourse.entity;

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

    private String detail;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private Date regDate;

    @OneToMany(mappedBy = "sharedFullCourse", cascade = CascadeType.REMOVE)
    private List<SharedFCComment> sharedFCComments = new ArrayList<>();

    @OneToMany(mappedBy = "sharedFullCourse", cascade = CascadeType.REMOVE)
    private List<SharedFCTag> sharedFCTags = new ArrayList<>();

    @OneToMany(mappedBy = "sharedFullCourse", cascade = CascadeType.REMOVE)
    private List<SharedFCLike> sharedFCLikes = new ArrayList<>();

    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "fcId")
    private FullCourse fullCourse;

}
