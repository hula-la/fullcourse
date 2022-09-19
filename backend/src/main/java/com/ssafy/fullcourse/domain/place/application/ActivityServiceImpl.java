package com.ssafy.fullcourse.domain.place.application;

import com.ssafy.fullcourse.domain.place.dto.ActivityDetailRes;
import com.ssafy.fullcourse.domain.place.dto.ListReq;
import com.ssafy.fullcourse.domain.place.dto.PlaceRes;
import com.ssafy.fullcourse.domain.place.entity.Activity;
import com.ssafy.fullcourse.domain.place.entity.ActivityLike;
import com.ssafy.fullcourse.domain.place.repository.ActivityLikeRepository;
import com.ssafy.fullcourse.domain.place.repository.ActivityRepository;
import com.ssafy.fullcourse.domain.review.exception.PlaceNotFoundException;
import com.ssafy.fullcourse.domain.user.entity.User;
import com.ssafy.fullcourse.domain.user.exception.UserNotFoundException;
import com.ssafy.fullcourse.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ActivityServiceImpl implements ActivityService{

    private final ActivityRepository activityRepository;
    private final ActivityLikeRepository activityLikeRepository;
    private final UserRepository userRepository;

    @Override
    public Page<PlaceRes> getActivityList(Pageable pageable) throws Exception {
        Page<Activity> page = activityRepository.findAll(pageable);
        return page.map(PlaceRes::new);
    }

    @Override
    public ActivityDetailRes getActivityDetail(Long placeId) throws Exception {
        return activityRepository.findByPlaceId(placeId).get().toDetailDto();
    }

    @Override
    @Transactional
    public boolean activityLike(Long placeId, Long userId) throws Exception {
        User user = userRepository.findById(userId).get();
        Activity activity = activityRepository.findByPlaceId(placeId).get();

        if(user == null){
            throw new UserNotFoundException();
        }if(activity == null){
            throw new PlaceNotFoundException();
        }

        Optional<ActivityLike> activityLike = activityLikeRepository.findByUserAndPlace(user, activity);

        if(activityLike.isPresent()){
            activityLikeRepository.deleteById(activityLike.get().getLikeId());
        } else {
            activityLikeRepository.save(ActivityLike.builder().user(user).place(activity).build());
        }
        return true;
    }
}
