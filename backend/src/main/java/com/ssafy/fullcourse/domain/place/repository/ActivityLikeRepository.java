package com.ssafy.fullcourse.domain.place.repository;

import com.ssafy.fullcourse.domain.place.entity.Activity;
import com.ssafy.fullcourse.domain.place.entity.ActivityLike;
import com.ssafy.fullcourse.domain.place.repository.baserepository.BaseLikeRepository;

public interface ActivityLikeRepository  extends BaseLikeRepository<ActivityLike, Activity> {
}
