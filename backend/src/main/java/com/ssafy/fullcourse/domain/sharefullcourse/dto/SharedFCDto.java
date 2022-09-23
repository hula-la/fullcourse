package com.ssafy.fullcourse.domain.sharefullcourse.dto;

import com.ssafy.fullcourse.domain.fullcourse.entity.FullCourse;
import com.ssafy.fullcourse.domain.user.entity.User;
import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SharedFCDto {

    private FullCourse fullCourse;
    private Long sharedFcId;
    private String detail;
    private String title;
    private Date regDate;
    private int day;
    @Builder.Default private Long likeCnt = 0L;
    @Builder.Default private Long commentCnt = 0L;
    @Builder.Default private Long viewCnt = 0L;
    private List<SharedFCTagDto> sharedFCTags;
    private List<SharedFCCommentRes> sharedFCComments;
    private String thumbnail;
    private User user;

    public static SharedFCDto of(FullCourse fullCourse, SharedFCReq sharedFCReq){
        return SharedFCDto.builder()
                .fullCourse(fullCourse)
                .detail(sharedFCReq.getDetail())
                .title(sharedFCReq.getTitle())
                .thumbnail(sharedFCReq.getThumbnail())
                .regDate(new Date())
                .day(sharedFCReq.getDay())
                .sharedFCTags(new ArrayList<>())
                .build();
    }


}
