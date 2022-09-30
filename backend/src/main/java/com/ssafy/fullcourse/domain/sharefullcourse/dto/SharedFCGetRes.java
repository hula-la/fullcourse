package com.ssafy.fullcourse.domain.sharefullcourse.dto;

import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFullCourse;
import com.ssafy.fullcourse.domain.user.dto.UserDto;
import lombok.*;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SharedFCGetRes {

    private Long fcId;
    private Long sharedFcId;
    private UserDto user;
    private String detail;
    private String title;
    private Date regDate;
    private int day;
    private Long likeCnt = 0L;
    private Long commentCnt = 0L;
    private Long viewCnt = 0L;
    private List<String> sharedFCTags;
    private List<SharedFCCommentRes> sharedFCComments;
    private String thumbnail;
    private boolean isLike;

    public static SharedFCGetRes of(SharedFullCourse sharedFullCourse, Boolean isLike){
        return SharedFCGetRes.builder()
                .fcId(sharedFullCourse.getFullCourse().getFcId())
                .sharedFcId(sharedFullCourse.getSharedFcId())
                .user(sharedFullCourse.getUser().toDto())
                .detail(sharedFullCourse.getDetail())
                .title(sharedFullCourse.getTitle())
                .regDate(sharedFullCourse.getRegDate())
                .day(sharedFullCourse.getDay())
                .likeCnt(sharedFullCourse.getLikeCnt())
                .commentCnt(sharedFullCourse.getCommentCnt())
                .viewCnt(sharedFullCourse.getViewCnt())
                .sharedFCTags(sharedFullCourse.getSharedFCTags().stream().map(tag->tag.getTagContent()).collect(Collectors.toList()))
                .sharedFCComments(sharedFullCourse.getSharedFCComments().stream().map(
                        comment-> SharedFCCommentRes.builder()
                                .commentId(comment.getFcCommentId())
                                .nickname(comment.getUser().getNickname())
                                .imgUrl(comment.getUser().getImgUrl())
                                .comment(comment.getComment()).build()).collect(Collectors.toList()))
                .thumbnail(sharedFullCourse.getThumbnail())
                .isLike(isLike)
                .build();
    }

}
