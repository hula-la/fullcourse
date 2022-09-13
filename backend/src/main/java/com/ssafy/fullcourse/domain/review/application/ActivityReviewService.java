package com.ssafy.fullcourse.domain.review.application;

import com.ssafy.fullcourse.domain.place.entity.Activity;
import com.ssafy.fullcourse.domain.place.repository.BasePlaceRepository;
import com.ssafy.fullcourse.domain.review.entity.ActivityReview;
import com.ssafy.fullcourse.domain.review.repository.BaseReviewRepository;
import com.ssafy.fullcourse.global.model.PlaceEnum;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class ActivityReviewService extends BaseReviewServiceImpl<ActivityReview, Activity> {
    public ActivityReviewService(Map<String, BaseReviewRepository> policyMap, Map<String, BasePlaceRepository> policies) {
        super(policyMap, policies);
    }
}
