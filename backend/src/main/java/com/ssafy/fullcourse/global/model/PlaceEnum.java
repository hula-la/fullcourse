package com.ssafy.fullcourse.global.model;

public enum PlaceEnum {
    ACTIVITY("activityReviewService","activityReviewRepository", "activityReview","activityReviewLikeRepository","activityRepository"),
    CULTURE("cultureReviewService","cultureReviewRepository", "cultureReview","cultureReviewLikeRepository","cultureRepository"),
    HOTEL("hotelReviewService","hotelReviewRepository", "hotelReview","hotelReviewLikeRepository","hotelRepository"),
    RESTAURANT("restaurantReviewService","restaurantReviewRepository", "restaurantReview","restaurantReviewLikeRepository","restaurantRepository"),
    TRAVEL("travelReviewService","travelReviewRepository", "travelReview","travelReviewLikeRepository","travelRepository");

    private final String service;
    private final String repository;
    private final String review;
    private final String reviewLikeRepository;
    private final String place;
    PlaceEnum(String service, String repository, String review, String reviewLikeRepository, String place) {
        this.service = service;
        this.repository = repository;
        this.reviewLikeRepository = reviewLikeRepository;
        this.review = review;
        this.place = place;
    }

    public String getService(){
        return this.service;
    }

    public String getRepository(){
        return this.repository;
    }

    public String getReviewLikeRepository(){ return this.reviewLikeRepository; }
    public String getReview(){ return this.review; }
    public String getPlace(){ return this.place; }
}
