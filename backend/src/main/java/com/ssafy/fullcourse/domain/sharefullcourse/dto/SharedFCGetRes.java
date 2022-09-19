package com.ssafy.fullcourse.domain.sharefullcourse.dto;

import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFullCourse;
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
    private String detail;
    private String title;
    private Date regDate;
    private Long likeCnt = 0L;
    private Long commentCnt = 0L;
    private Long viewCnt = 0L;
    private List<String> sharedFCTags;
    private List<SharedFCCommentRes> sharedFCComments;
    private String thumbnail;

    public static SharedFCGetRes of(SharedFullCourse sharedFullCourse){
        return SharedFCGetRes.builder()
                .fcId(sharedFullCourse.getFullCourse().getFcId())
                .sharedFcId(sharedFullCourse.getSharedFcId())
                .detail(sharedFullCourse.getDetail())
                .title(sharedFullCourse.getTitle())
                .regDate(sharedFullCourse.getRegDate())
                .likeCnt(sharedFullCourse.getLikeCnt())
                .commentCnt(sharedFullCourse.getCommentCnt())
                .viewCnt(sharedFullCourse.getViewCnt())
                .sharedFCTags(sharedFullCourse.getSharedFCTags().stream().map(tag->tag.getTagContent()).collect(Collectors.toList()))
                .sharedFCComments(sharedFullCourse.getSharedFCComments().stream().map(
                        comment-> SharedFCCommentRes.builder()
                                .commentId(comment.getFcCommentId())
                                .nickname(comment.getUser().getNickname())
                                .comment(comment.getComment()).build()).collect(Collectors.toList()))
                .thumbnail(sharedFullCourse.getThumbnail()).build();
    }

}
