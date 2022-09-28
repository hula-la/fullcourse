package com.ssafy.fullcourse.domain.place.application;

import com.ssafy.fullcourse.domain.place.dto.ActivityDetailRes;
import com.ssafy.fullcourse.domain.place.dto.PlaceRes;
import com.ssafy.fullcourse.domain.place.entity.Activity;
import com.ssafy.fullcourse.domain.place.entity.ActivityLike;
import com.ssafy.fullcourse.domain.place.entity.Activity;
import com.ssafy.fullcourse.domain.place.repository.ActivityLikeRepository;
import com.ssafy.fullcourse.domain.place.repository.ActivityRepository;
import com.ssafy.fullcourse.domain.review.exception.PlaceNotFoundException;
import com.ssafy.fullcourse.domain.user.entity.User;
import com.ssafy.fullcourse.domain.user.exception.UserNotFoundException;
import com.ssafy.fullcourse.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ActivityService {

    private final ActivityRepository activityRepository;
    private final ActivityLikeRepository activityLikeRepository;
    private final UserRepository userRepository;

    public Page<PlaceRes> getActivityList(Pageable pageable, String keyword, Integer maxDist, Float lat, Float lng) throws Exception {
        Page<Activity> page = null;
        List<Activity> list = null;
        if (keyword.equals("")) {
            list = activityRepository.findAll();
        } else {
            list = activityRepository.findByNameContaining(keyword);
        }
        list = extractByDist(list, lat, lng, maxDist);
        page = new PageImpl(list, pageable, list.size());
        return page.map(PlaceRes::new);
    }


    public ActivityDetailRes getActivityDetail(Long placeId) throws Exception {
        return activityRepository.findByPlaceId(placeId).get().toDetailDto();
    }


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
            activity.setLikeCnt(activity.getLikeCnt() - 1);
        } else {
            activityLikeRepository.save(ActivityLike.builder().user(user).place(activity).build());
            activity.setLikeCnt(activity.getLikeCnt() + 1);
        }
        activityRepository.save(activity);
        return true;
    }
    public static List<Activity> extractByDist(List<Activity> list, Float lat, Float lng, Integer maxDist){
        for (int i = 0; i < list.size(); i++) {
            Activity a = list.get(i);
            Double dist = Math.sqrt(Math.pow((a.getLat() - lat) * 88.9036, 2) + Math.pow((a.getLng() - lng) * 111.3194, 2));
            if (dist >= maxDist) {
                list.remove(a);
                i--;
            }
        }
        return list;
    }
}
