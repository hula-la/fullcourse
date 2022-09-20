package com.ssafy.fullcourse.domain.sharefullcourse.entity;

import com.ssafy.fullcourse.domain.fullcourse.entity.FullCourse;
import com.ssafy.fullcourse.domain.sharefullcourse.dto.SharedFCDto;
import com.ssafy.fullcourse.domain.user.entity.User;
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
    private Long likeCnt = 0L;

    @Column(nullable = false)
    private Long commentCnt = 0L;

    @Column(nullable = false)
    private Long viewCnt = 0L;

    @Column(nullable = false, length = 100)
    private String thumbnail;

    @OneToMany(mappedBy = "sharedFullCourse", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<SharedFCComment> sharedFCComments = new ArrayList<>();

    @OneToMany(mappedBy = "sharedFullCourse", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SharedFCTag> sharedFCTags = new ArrayList<>();

    @OneToMany(mappedBy = "sharedFullCourse", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<SharedFCLike> sharedFCLikes = new ArrayList<>();

    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "fcId")
    private FullCourse fullCourse;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "userId")
    private User user;

    public static SharedFullCourse of(SharedFCDto sharedFCDto){

        return SharedFullCourse.builder()
                .sharedFcId(sharedFCDto.getSharedFcId())
                .detail(sharedFCDto.getDetail())
                .title(sharedFCDto.getTitle())
                .regDate(sharedFCDto.getRegDate())
                .likeCnt(sharedFCDto.getLikeCnt())
                .commentCnt(sharedFCDto.getCommentCnt())
                .viewCnt(sharedFCDto.getViewCnt())
                .sharedFCTags(new ArrayList<>())
                .thumbnail(sharedFCDto.getThumbnail())
                .fullCourse(sharedFCDto.getFullCourse())
                .build();
    }

    public static SharedFullCourse sharedFCUpdate(SharedFCDto sharedFCDto, SharedFullCourse now){

        return SharedFullCourse.builder()
                .sharedFcId(sharedFCDto.getSharedFcId())
                .detail(sharedFCDto.getDetail())
                .title(sharedFCDto.getTitle())
                .regDate(now.getRegDate())
                .likeCnt(now.getLikeCnt())
                .commentCnt(now.getCommentCnt())
                .viewCnt(now.getViewCnt())
                .sharedFCTags(new ArrayList<>())
                .thumbnail(now.getThumbnail())
                .fullCourse(now.getFullCourse())
                .build();
    }


}
