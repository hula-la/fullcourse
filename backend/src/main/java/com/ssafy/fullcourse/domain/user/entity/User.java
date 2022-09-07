package com.ssafy.fullcourse.domain.user.entity;

import com.ssafy.fullcourse.domain.fullcourse.entity.FullCourse;
import com.ssafy.fullcourse.domain.place.entity.*;
import com.ssafy.fullcourse.domain.review.activity.entity.ActivityReview;
import com.ssafy.fullcourse.domain.review.activity.entity.ActivityReviewLike;
import com.ssafy.fullcourse.domain.review.culture.entity.CultureReview;
import com.ssafy.fullcourse.domain.review.culture.entity.CultureReviewLike;
import com.ssafy.fullcourse.domain.review.hotel.entity.HotelReview;
import com.ssafy.fullcourse.domain.review.hotel.entity.HotelReviewLike;
import com.ssafy.fullcourse.domain.review.restaurant.entity.RestaurantReview;
import com.ssafy.fullcourse.domain.review.restaurant.entity.RestaurantReviewLike;
import com.ssafy.fullcourse.domain.review.travel.entity.TravelReview;
import com.ssafy.fullcourse.domain.review.travel.entity.TravelReviewLike;
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

    @Column(nullable = false, length = 20)
    private String password;

    @Column(nullable = false, unique = true, length = 24)
    private String nickname;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private Gender gender;

    @Column(nullable = false)
    private String birth;

    @Column(length = 100)
    private String img_url;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private LoginType loginType;

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<RestaurantReview> restaurantReviews = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<TravelTagCnt> travelTagCnts = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<TravelReview> travelReviews = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<HotelReview> hotelReviews = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<CultureReview> cultureReviews = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<ActivityReview> activityReviews = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<Custom> customs = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<FullCourse> fullCourses = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<SharedFCComment> sharedFCComments = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<SharedFCLike> sharedFCLikes = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<RestaurantReviewLike> restaurantReviewLikes = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<TravelReviewLike> travelReviewLikes = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<HotelReviewLike> hotelReviewLikes = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<CultureReviewLike> cultureReviewLikes = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<ActivityReviewLike> activityReviewLikes = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<RestaurantLike> restaurantLikes = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<TravelLike> travelLikes = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<HotelLike> hotelLikes = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<CultureLike> cultureLikes = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<ActivityLike> activityLikes = new ArrayList<>();
}
