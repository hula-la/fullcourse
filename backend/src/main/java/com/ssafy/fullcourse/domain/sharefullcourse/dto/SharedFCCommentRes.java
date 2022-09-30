package com.ssafy.fullcourse.domain.sharefullcourse.dto;

import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFCComment;
import lombok.*;


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

    public static SharedFCCommentRes of(SharedFCComment sharedFCComment){
        return SharedFCCommentRes.builder()
                .commentId(sharedFCComment.getFcCommentId())
                .imgUrl(sharedFCComment.getUser().getImgUrl())
                .nickname(sharedFCComment.getUser().getNickname())
                .email(sharedFCComment.getUser().getEmail())
                .comment(sharedFCComment.getComment()).build();
    }
}
