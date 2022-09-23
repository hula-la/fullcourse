package com.ssafy.fullcourse.domain.sharefullcourse.entity;

import com.ssafy.fullcourse.domain.fullcourse.entity.FullCourse;
import com.ssafy.fullcourse.domain.sharefullcourse.dto.SharedFCDto;
import com.ssafy.fullcourse.domain.user.entity.User;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

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
    private Long likeCnt = 0L;

    @Column(nullable = false)
    private Long commentCnt = 0L;

    @Column(nullable = false)
    private Long viewCnt = 0L;

    @Column(nullable = false, length = 100)
    private String thumbnail;

    @Column(nullable = false)
    private int day;

    @OneToMany(mappedBy = "sharedFullCourse", cascade = CascadeType.REMOVE)
    private List<SharedFCComment> sharedFCComments = new ArrayList<>();

    @OneToMany(mappedBy = "sharedFullCourse",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SharedFCTag> sharedFCTags = new ArrayList<>();

    @OneToMany(mappedBy = "sharedFullCourse", cascade = CascadeType.REMOVE)
    private List<SharedFCLike> sharedFCLikes = new ArrayList<>();

    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "fcId")
    private FullCourse fullCourse;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public static SharedFullCourse of(SharedFCDto sharedFCDto, User user){

        return SharedFullCourse.builder()
                .sharedFcId(sharedFCDto.getSharedFcId())
                .detail(sharedFCDto.getDetail())
                .title(sharedFCDto.getTitle())
                .regDate(sharedFCDto.getRegDate())
                .day(sharedFCDto.getDay())
                .likeCnt(sharedFCDto.getLikeCnt())
                .commentCnt(sharedFCDto.getCommentCnt())
                .viewCnt(sharedFCDto.getViewCnt())
                .sharedFCTags(sharedFCDto.getSharedFCTags().stream().map(tag->SharedFCTag.builder().fcTagId(tag.getFcTagId()).tagContent(tag.getTagContent()).build()).collect(Collectors.toList()))
                .thumbnail(sharedFCDto.getThumbnail())
                .fullCourse(sharedFCDto.getFullCourse())
                .user(user)
                .build();
    }

    public static SharedFullCourse sharedFCUpdate(SharedFCDto sharedFCDto, SharedFullCourse now, Long sharedFcId){

        return SharedFullCourse.builder()
                .sharedFcId(sharedFcId)
                .detail(sharedFCDto.getDetail())
                .title(sharedFCDto.getTitle())
                .regDate(now.getRegDate())
                .day(sharedFCDto.getDay())
                .likeCnt(now.getLikeCnt())
                .commentCnt(now.getCommentCnt())
                .viewCnt(now.getViewCnt())
                .sharedFCTags(new ArrayList<>())
                .sharedFCComments(now.getSharedFCComments())
                .thumbnail(now.getThumbnail())
                .fullCourse(sharedFCDto.getFullCourse())
                .user(now.getUser())
                .build();
    }

}
