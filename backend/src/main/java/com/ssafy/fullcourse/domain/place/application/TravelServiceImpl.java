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
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.StringTokenizer;

@Service
@RequiredArgsConstructor
public class TravelServiceImpl implements TravelService {

    private final TravelRepository travelRepository;
    private final TravelLikeRepository travelLikeRepository;
    private final UserRepository userRepository;

    @Override
    public Page<PlaceRes> getTravelList(Pageable pageable, String keyword, String tag, Integer maxDist, Float lat, Float lng) throws Exception {
        boolean checkDist = false, checkTag = false;
        List<String> tagList = null;
        StringTokenizer st = null;
        if (maxDist != 0 && lat != 0 && lng != 0) checkDist = true;
        if (!tag.equals("")) checkTag = true;
        System.out.println(maxDist + " " + lat + " " + lng);

        if (checkTag) {
            st = new StringTokenizer(tag, ",");
            tagList = new ArrayList<>();
            int n = st.countTokens();
            for (int i = 0; i < n; i++) {
                tagList.add(st.nextToken());
            }
        }
        List<Travel> list = travelRepository.findByNameContaining(keyword);
        for (int i = 0; i < list.size(); i++) {
            int cnt = 0;
            Travel t = list.get(i);

            if (checkDist) {
                // Km 단위로 계산됨.
                Double dist = Math.sqrt(Math.pow((t.getLat() - lat) * 88.9036, 2) + Math.pow((t.getLng() - lng) * 111.3194,
                        2));
                if (dist >= maxDist) {
                    list.remove(t);
                    i--;
                    continue;
                }
            }
            if (checkTag) {
                for (String tg : tagList) {
                    if (t.getTag() != null) {
                        if (t.getTag().contains(tg)) {
                            cnt++;
                            break;
                        }
                    }
                }
                if (cnt == 0) {
                    list.remove(t);
                    i--;
                }
            }
        }

        Page<Travel> page = new PageImpl(list, pageable, list.size());
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
            travel.setLikeCnt(travel.getLikeCnt() - 1);
        } else {
            travelLikeRepository.save(TravelLike.builder().user(user).place(travel).build());
            travel.setLikeCnt(travel.getLikeCnt() + 1);
        }
        travelRepository.save(travel);
        return true;
    }
}
