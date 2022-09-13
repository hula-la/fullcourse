package com.ssafy.fullcourse.domain.review.entity.baseentity;

import com.ssafy.fullcourse.domain.place.entity.BasePlace;
import com.ssafy.fullcourse.domain.user.entity.User;
import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

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
    private Long likeCnt;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "placeId")
    private P place;

//    @OneToMany(mappedBy = "review", cascade = CascadeType.REMOVE)
//    private List<BaseReviewLike> reviewLikes;

    public void update(String content, Float score){
        this.content = content;
        this.score = score;
    }
    
    public void addLikeCnt(int plus){
        this.likeCnt += plus;
    }


}
