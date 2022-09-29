package com.ssafy.fullcourse.domain.place.application;

import com.ssafy.fullcourse.domain.place.dto.ActivityDetailRes;
import com.ssafy.fullcourse.domain.place.dto.PlaceRes;
import com.ssafy.fullcourse.domain.place.dto.RestaurantDetailRes;
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
        if(maxDist != 0) list = extractByDist(list, lat, lng, maxDist);
        int start = (int)pageable.getOffset();
        int end = (start + pageable.getPageSize()) > list.size() ? list.size() : (start + pageable.getPageSize());
        page = new PageImpl(list.subList(start, end), pageable, list.size());
        return page.map(PlaceRes::new);
    }


    public ActivityDetailRes getActivityDetail(Long placeId, String email) throws Exception {
        ActivityDetailRes activityDetailRes = activityRepository.findByPlaceId(placeId).get().toDetailDto();
        activityDetailRes.setIsLiked(activityLikeRepository.findByUserAndPlace(userRepository.findByEmail(email).get(),
                activityRepository.findByPlaceId(placeId).get()).isPresent() ? true : false);
        return activityDetailRes;
    }


    @Transactional
    public boolean activityLike(Long placeId, String email) throws Exception {
        boolean response = false;
        User user = userRepository.findByEmail(email).get();
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
            response = false;
        } else {
            activityLikeRepository.save(ActivityLike.builder().user(user).place(activity).build());
            activity.setLikeCnt(activity.getLikeCnt() + 1);
            response = true;
        }
        activityRepository.save(activity);
        return response;
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
