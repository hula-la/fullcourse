package com.ssafy.fullcourse.global.model;

public enum PlaceEnum {
    ACTIVITY("activityReviewService","activityReviewRepository", "activityReview");

    private final String service;
    private final String repository;
    private final String review;
    PlaceEnum(String service, String repository, String review) {
        this.service = service;
        this.repository = repository;
        this.review = review;
    }

    public String getService(){
        return this.service;
    }

    public String getRepository(){
        return this.repository;
    }

    public String getReview(){ return this.review; }
}
