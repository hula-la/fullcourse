package com.ssafy.fullcourse.domain.sharefullcourse.dto;

import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFCTag;
import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SharedFCLikeResDto {

    private boolean isLike;
    private Long likeCnt;

    public SharedFCLikeResDto(boolean isLike, long likeCnt) {
        this.isLike = isLike;
        this.likeCnt = likeCnt;
    }

}
