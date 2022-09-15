package com.ssafy.fullcourse.domain.sharefullcourse.dto;

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
}
