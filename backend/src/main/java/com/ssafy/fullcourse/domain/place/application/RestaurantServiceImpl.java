package com.ssafy.fullcourse.domain.place.application;

import com.ssafy.fullcourse.domain.place.dto.ListReq;
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
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RestaurantServiceImpl implements RestaurantService {

    private final RestaurantRepository restaurantRepository;
    private final RestaurantLikeRepository restaurantLikeRepository;
    private final UserRepository userRepository;

    @Override
    public Page<PlaceRes> getRestaurantList(Pageable pageable) throws Exception {
        Page<Restaurant> page = restaurantRepository.findAll(pageable);
        return page.map(PlaceRes::new);
    }

    @Override
    public RestaurantDetailRes getRestaurantDetail(Long placeId) throws Exception {
        return restaurantRepository.findByPlaceId(placeId).get().toDetailDto();
    }

    @Override
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
        } else {
            restaurantLikeRepository.save(RestaurantLike.builder().user(user).place(restaurant).build());
        }


        return true;
    }
}
