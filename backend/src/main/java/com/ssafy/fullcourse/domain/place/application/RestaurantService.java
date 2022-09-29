package com.ssafy.fullcourse.domain.place.application;

import com.ssafy.fullcourse.domain.place.dto.PlaceRes;
import com.ssafy.fullcourse.domain.place.dto.RestaurantDetailRes;
import com.ssafy.fullcourse.domain.place.entity.Restaurant;
import com.ssafy.fullcourse.domain.place.entity.RestaurantLike;
import com.ssafy.fullcourse.domain.place.repository.RestaurantLikeRepository;
import com.ssafy.fullcourse.domain.place.repository.RestaurantRepository;
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
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;
    private final RestaurantLikeRepository restaurantLikeRepository;
    private final UserRepository userRepository;

    public Page<PlaceRes> getRestaurantList(Pageable pageable, String keyword, String tag, Integer maxDist, Float lat, Float lng) throws Exception {
        Page<Restaurant> page;
        List<Restaurant> list;
        if (maxDist == 0 || lat == 0 || lng == 0) {
            if (keyword.equals("") && tag.equals("")) {
                page = restaurantRepository.findAll(pageable);
            } else if (!tag.equals("") && keyword.equals("")) {
                page = restaurantRepository.findByCategory(tag, pageable);
            } else if (!keyword.equals("") && tag.equals("")) {
                page = restaurantRepository.findByNameContaining(keyword, pageable);
            } else {
                page = restaurantRepository.findByNameContainingAndCategory(keyword, tag, pageable);
            }

        } else {
            if (keyword.equals("") && tag.equals("")) {
                list = restaurantRepository.findAll();
            } else if (!tag.equals("") && keyword.equals("")) {
                list = restaurantRepository.findByCategory(tag);
            } else if (!keyword.equals("") && tag.equals("")) {
                list = restaurantRepository.findByNameContaining(keyword);
            } else {
                list = restaurantRepository.findByNameContainingAndCategory(keyword, tag);
            }
            list = extractByDist(list, lat, lng, maxDist);
            int start = (int)pageable.getOffset();
            int end = (start + pageable.getPageSize()) > list.size() ? list.size() : (start + pageable.getPageSize());
            page = new PageImpl(list.subList(start, end), pageable, list.size());
        }
        return page.map(PlaceRes::new);
    }

    public RestaurantDetailRes getRestaurantDetail(Long placeId) throws Exception {
        return restaurantRepository.findByPlaceId(placeId).get().toDetailDto();
    }

    @Transactional
    public boolean restaurantLike(Long placeId, Long userId) throws Exception {
        User user = userRepository.findById(userId).get();
        Restaurant restaurant = restaurantRepository.findByPlaceId(placeId).get();

        if (user == null) {
            throw new UserNotFoundException();
        }
        if (restaurant == null) {
            throw new PlaceNotFoundException();
        }

        Optional<RestaurantLike> restaurantLike = restaurantLikeRepository.findByUserAndPlace(user, restaurant);

        if (restaurantLike.isPresent()) {
            restaurantLikeRepository.deleteById(restaurantLike.get().getLikeId());
            restaurant.setLikeCnt(restaurant.getLikeCnt() - 1);
        } else {
            restaurantLikeRepository.save(RestaurantLike.builder().user(user).place(restaurant).build());
            restaurant.setLikeCnt(restaurant.getLikeCnt() + 1);
        }
        restaurantRepository.save(restaurant);

        return true;
    }

    public static List<Restaurant> extractByDist(List<Restaurant> list, Float lat, Float lng, Integer maxDist){
        for (int i = 0; i < list.size(); i++) {
            Restaurant r = list.get(i);
            Double dist = Math.sqrt(Math.pow((r.getLat() - lat) * 88.9036, 2) + Math.pow((r.getLng() - lng) * 111.3194, 2));
            if (dist >= maxDist) {
                list.remove(r);
                i--;
            }
        }
        return list;
    }
}
