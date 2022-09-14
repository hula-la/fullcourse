package com.ssafy.fullcourse.domain.user.entity;

import com.ssafy.fullcourse.domain.fullcourse.entity.FullCourse;
import com.ssafy.fullcourse.domain.place.entity.*;
import com.ssafy.fullcourse.domain.review.entity.*;
import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFCComment;
import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFCLike;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false, unique = true, length = 50)
    private String email;

    @Column(nullable = false)
    private String socialId;

    @Column(nullable = false, unique = true)
    private String nickname;

    @Enumerated(EnumType.STRING)
//    @Column(nullable = false, length = 10)
    private Gender gender;

//    @Column(nullable = false)
    private String birth;

    @Column(length = 100)
    private String imgUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private LoginType loginType;

//    @OneToMany(mappedBy = "user")
//    private Set<Authority> authorities;

    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<RestaurantReview> restaurantReviews = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<TravelTagCnt> travelTagCnts = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<TravelReview> travelReviews = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<HotelReview> hotelReviews = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<CultureReview> cultureReviews = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<ActivityReview> activityReviews = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<Custom> customs = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<FullCourse> fullCourses = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<SharedFCComment> sharedFCComments = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<SharedFCLike> sharedFCLikes = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<RestaurantReviewLike> restaurantReviewLikes = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<TravelReviewLike> travelReviewLikes = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<HotelReviewLike> hotelReviewLikes = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<CultureReviewLike> cultureReviewLikes = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<ActivityReviewLike> activityReviewLikes = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<RestaurantLike> restaurantLikes = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<TravelLike> travelLikes = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<HotelLike> hotelLikes = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<CultureLike> cultureLikes = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<ActivityLike> activityLikes = new ArrayList<>();
}
