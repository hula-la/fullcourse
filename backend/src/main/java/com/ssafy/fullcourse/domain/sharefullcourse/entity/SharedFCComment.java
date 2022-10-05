package com.ssafy.fullcourse.domain.sharefullcourse.entity;

import com.ssafy.fullcourse.domain.sharefullcourse.dto.SharedFCCommentReq;
import com.ssafy.fullcourse.domain.sharefullcourse.dto.SharedFCCommentRes;
import com.ssafy.fullcourse.domain.user.entity.User;
import lombok.*;

import javax.persistence.*;

import java.util.Date;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SharedFCComment {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fcCommentId;

    @Column(nullable = false, length = 100)
    private String comment;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "sharedFcId")
    private SharedFullCourse sharedFullCourse;

    @Column(nullable = true)
    private Date regDate;

    public static SharedFCComment of(SharedFullCourse sharedFullCourse, String comment, User user){
        return SharedFCComment.builder()
                .sharedFullCourse(sharedFullCourse)
                .comment(comment)
                .user(user).build();
    }


}
