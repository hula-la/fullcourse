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
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class HotelService {

    private final HotelRepository hotelRepository;
    private final HotelLikeRepository hotelLikeRepository;
    private final UserRepository userRepository;

    public Page<PlaceRes> getHotelList(Pageable pageable, String keyword, Integer maxDist, Float lat, Float lng) throws Exception {
        Page<Hotel> page;
        List<Hotel> list;
        if (keyword.equals("")) {
            list = hotelRepository.findAll();
        } else {
            list = hotelRepository.findByNameContaining(keyword);
        }
        if(maxDist != 0) {
            list = extractByDist(list, lat, lng, maxDist);
        }
        if(pageable.getSort().toString().equals("likeCnt: DESC")){
            Collections.sort(list, (o1, o2) -> (int)(o2.getLikeCnt() - o1.getLikeCnt()));
        } else if (pageable.getSort().toString().equals("addedCnt: DESC")) {
            Collections.sort(list, (o1, o2) -> (int)(o2.getAddedCnt() - o1.getAddedCnt()));
        } else if (pageable.getSort().toString().equals("reviewCnt: DESC")) {
            Collections.sort(list, (o1, o2) -> (int)(o2.getReviewCnt() - o1.getReviewCnt()));
        }
        int start = (int)pageable.getOffset();
        int end = (start + pageable.getPageSize()) > list.size() ? list.size() : (start + pageable.getPageSize());
        page = new PageImpl(list.subList(start, end), pageable, list.size());
        return page.map(PlaceRes::new);
    }

    public HotelDetailRes getHotelDetail(Long placeId, String email) throws Exception {
        HotelDetailRes hotelDetailRes = hotelRepository.findByPlaceId(placeId).get().toDetailDto();
        hotelDetailRes.setIsLiked(hotelLikeRepository.findByUserAndPlace(userRepository.findByEmail(email).get(),
                hotelRepository.findByPlaceId(placeId).get()).isPresent() ? true : false);
        return hotelDetailRes;
    }

    @Transactional
    public boolean hotelLike(Long placeId, String email) throws Exception {
        boolean response = false;
        User user = userRepository.findByEmail(email).get();
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
            response = false;
        } else {
            hotelLikeRepository.save(HotelLike.builder().user(user).place(hotel).build());
            hotel.setLikeCnt(hotel.getLikeCnt() + 1);
            response = true;
        }
        hotelRepository.save(hotel);
        return response;
    }

    public static List<Hotel> extractByDist(List<Hotel> list, Float lat, Float lng, Integer maxDist){
        for (int i = 0; i < list.size(); i++) {
            Hotel h = list.get(i);
            Double dist = Math.sqrt(Math.pow((h.getLat() - lat) * 88.9036, 2) + Math.pow((h.getLng() - lng) * 111.3194, 2));
            if (dist >= maxDist) {
                list.remove(h);
                i--;
            }
        }
        return list;
    }
}
