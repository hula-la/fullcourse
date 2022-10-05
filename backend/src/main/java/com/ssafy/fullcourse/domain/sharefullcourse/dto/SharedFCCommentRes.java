package com.ssafy.fullcourse.domain.sharefullcourse.dto;

import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFCComment;
import lombok.*;

import java.util.Date;


@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SharedFCCommentRes {

    private Long commentId;
    private String comment;
    private String nickname;
    private String imgUrl;
    private String email;
    private Date regDate;
    public static SharedFCCommentRes of(SharedFCComment sharedFCComment){
        return SharedFCCommentRes.builder()
                .commentId(sharedFCComment.getFcCommentId())
                .imgUrl(sharedFCComment.getUser().getImgUrl())
                .nickname(sharedFCComment.getUser().getNickname())
                .email(sharedFCComment.getUser().getEmail())
                .regDate(sharedFCComment.getRegDate())
                .comment(sharedFCComment.getComment()).build();
    }
}
