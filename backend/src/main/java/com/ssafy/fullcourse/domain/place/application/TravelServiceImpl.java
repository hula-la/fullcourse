package com.ssafy.fullcourse.domain.place.application;

import com.ssafy.fullcourse.domain.place.dto.PlaceRes;
import com.ssafy.fullcourse.domain.place.dto.TravelDetailRes;
import com.ssafy.fullcourse.domain.place.entity.Travel;
import com.ssafy.fullcourse.domain.place.entity.TravelLike;
import com.ssafy.fullcourse.domain.place.repository.TravelLikeRepository;
import com.ssafy.fullcourse.domain.place.repository.TravelRepository;
import com.ssafy.fullcourse.domain.review.exception.PlaceNotFoundException;
import com.ssafy.fullcourse.domain.user.entity.User;
import com.ssafy.fullcourse.domain.user.exception.UserNotFoundException;
import com.ssafy.fullcourse.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TravelServiceImpl implements TravelService {

    private final TravelRepository travelRepository;
    private final TravelLikeRepository travelLikeRepository;
    private final UserRepository userRepository;

    @Override
    public Page<PlaceRes> getTravelList(Pageable pageable, String keyword) throws Exception {
        Page<Travel> page;
        if (keyword.equals("")) {
            page = travelRepository.findAll(pageable);
        } else {
            page = travelRepository.findByNameContaining(keyword, pageable);
        }
        return page.map(PlaceRes::new);
    }

    @Override
    public TravelDetailRes getTravelDetail(Long placeId) throws Exception {
        return travelRepository.findByPlaceId(placeId).get().toDetailDto();
    }

    @Override
    @Transactional
    public boolean travelLike(Long placeId, Long userId) throws Exception {
        User user = userRepository.findById(userId).get();
        Travel travel = travelRepository.findByPlaceId(placeId).get();

        if (user == null) {
            throw new UserNotFoundException();
        }
        if (travel == null) {
            throw new PlaceNotFoundException();
        }

        Optional<TravelLike> travelLike = travelLikeRepository.findByUserAndPlace(user, travel);

        if (travelLike.isPresent()) {
            travelLikeRepository.deleteById(travelLike.get().getLikeId());
        } else {
            travelLikeRepository.save(TravelLike.builder().user(user).place(travel).build());
        }

        return true;
    }
}
