package com.ssafy.fullcourse.domain.review.entity.baseentity;

import com.ssafy.fullcourse.domain.place.entity.baseentity.BasePlace;
import com.ssafy.fullcourse.domain.user.entity.User;
import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

import java.util.Date;

import static javax.persistence.FetchType.LAZY;

//@DynamicInsert
@MappedSuperclass
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BaseReview<P extends BasePlace> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    @Column(nullable = false, length = 500)
    private String content;

    @Column(length = 100)
    private String reviewImg;

    @Column(nullable = false)
    private Float score;

    @Column(nullable = false)
    private Long likeCnt = 0L;

    @Column(nullable = false)
    private Boolean isVisited = false;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "placeId")
    private P place;

    @Column(nullable = false)
    private Date regDate;

    public void update(String content, Float score, String imgUrl){
        this.content = content;
        this.score = score;
        this.reviewImg = imgUrl;
    }
    
    public void addLikeCnt(int plus){
        this.likeCnt += plus;
    }


}
