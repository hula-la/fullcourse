package com.ssafy.fullcourse.domain.place.application;

import com.ssafy.fullcourse.domain.place.dto.HotelDetailRes;
import com.ssafy.fullcourse.domain.place.dto.PlaceRes;
import com.ssafy.fullcourse.domain.place.entity.Hotel;
import com.ssafy.fullcourse.domain.place.entity.HotelLike;
import com.ssafy.fullcourse.domain.place.repository.HotelLikeRepository;
import com.ssafy.fullcourse.domain.place.repository.HotelRepository;
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
public class HotelServiceImpl implements HotelService {

    private final HotelRepository hotelRepository;
    private final HotelLikeRepository hotelLikeRepository;
    private final UserRepository userRepository;

    @Override
    public Page<PlaceRes> getHotelList(Pageable pageable, String keyword) throws Exception {
        Page<Hotel> page;
        if (keyword.equals("")) {
            page = hotelRepository.findAll(pageable);
        } else {
            page = hotelRepository.findByNameContaining(keyword, pageable);
        }
        return page.map(PlaceRes::new);
    }

    @Override
    public HotelDetailRes getHotelDetail(Long placeId) throws Exception {
        return hotelRepository.findByPlaceId(placeId).get().toDetailDto();
    }

    @Override
    @Transactional
    public boolean hotelLike(Long placeId, Long userId) throws Exception {
        User user = userRepository.findById(userId).get();
        Hotel hotel = hotelRepository.findByPlaceId(placeId).get();

        if (user == null) {
            throw new UserNotFoundException();
        }
        if (hotel == null) {
            throw new PlaceNotFoundException();
        }
        Optional<HotelLike> hotelLike = hotelLikeRepository.findByUserAndPlace(user, hotel);

        if (hotelLike.isPresent()) {
            hotelLikeRepository.deleteById(hotelLike.get().getLikeId());
            hotel.setLikeCnt(hotel.getLikeCnt() - 1);
        } else {
            hotelLikeRepository.save(HotelLike.builder().user(user).place(hotel).build());
            hotel.setLikeCnt(hotel.getLikeCnt() + 1);
        }
        hotelRepository.save(hotel);
        return true;
    }
}
