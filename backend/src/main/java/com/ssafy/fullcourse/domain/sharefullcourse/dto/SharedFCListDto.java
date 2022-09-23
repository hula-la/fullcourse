package com.ssafy.fullcourse.domain.sharefullcourse.dto;

import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFullCourse;
import com.ssafy.fullcourse.domain.user.dto.UserDto;
import lombok.*;

import java.util.Date;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SharedFCListDto {

    private Long sharedFcId;
    private String detail;
    private String title;
    private Date regDate;
    private Long likeCnt;
    private Long commentCnt;
    private Long viewCnt;
    private List<SharedFCTagDto> sharedFCTags;
    private String thumbnail;
    private UserDto user;
    private boolean isLiked;

    public SharedFCListDto(SharedFullCourse sharedFullCourse, boolean isLiked, List<SharedFCTagDto> tagDto) {
        System.out.println(sharedFullCourse.toString());

        this.sharedFcId = sharedFullCourse.getSharedFcId();
        this.detail = sharedFullCourse.getDetail();
        this.title = sharedFullCourse.getTitle();
        this.regDate = sharedFullCourse.getRegDate();
        this.likeCnt = sharedFullCourse.getLikeCnt();
        this.commentCnt = sharedFullCourse.getCommentCnt();
        this.viewCnt = sharedFullCourse.getViewCnt();
        this.sharedFCTags = tagDto;
        this.thumbnail = sharedFullCourse.getThumbnail();
        this.user = sharedFullCourse.getUser().toDto();
        this.isLiked = isLiked;
    }
    public SharedFCListDto(SharedFullCourse sharedFullCourse, List<SharedFCTagDto> tagDto) {
        System.out.println(sharedFullCourse.getUser().getEmail());
        this.sharedFcId = sharedFullCourse.getSharedFcId();
        this.detail = sharedFullCourse.getDetail();
        this.title = sharedFullCourse.getTitle();
        this.regDate = sharedFullCourse.getRegDate();
        this.likeCnt = sharedFullCourse.getLikeCnt();
        this.commentCnt = sharedFullCourse.getCommentCnt();
        this.viewCnt = sharedFullCourse.getViewCnt();
        this.sharedFCTags = tagDto;
        this.thumbnail = sharedFullCourse.getThumbnail();
        this.user = sharedFullCourse.getUser().toDto();
    }
}
