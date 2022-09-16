package com.ssafy.fullcourse.domain.review.application;

import com.ssafy.fullcourse.domain.place.entity.Hotel;
import com.ssafy.fullcourse.domain.place.repository.baserepository.BasePlaceRepository;
import com.ssafy.fullcourse.domain.review.application.baseservice.BaseReviewServiceImpl;
import com.ssafy.fullcourse.domain.review.dto.ReviewPostReq;
import com.ssafy.fullcourse.domain.review.entity.HotelReview;
import com.ssafy.fullcourse.domain.review.entity.HotelReviewLike;
import com.ssafy.fullcourse.domain.review.exception.PlaceNotFoundException;
import com.ssafy.fullcourse.domain.review.exception.ReviewNotFoundException;
import com.ssafy.fullcourse.domain.review.repository.baserepository.BaseReviewLikeRepository;
import com.ssafy.fullcourse.domain.review.repository.baserepository.BaseReviewRepository;
import com.ssafy.fullcourse.domain.user.entity.User;
import com.ssafy.fullcourse.domain.user.exception.UserNotFoundException;
import com.ssafy.fullcourse.global.model.PlaceEnum;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Map;
import java.util.Optional;

@Service
public class HotelReviewService extends BaseReviewServiceImpl<HotelReview, Hotel, HotelReviewLike> {
    public HotelReviewService(Map<String, BaseReviewRepository> baseReviewRepositoryMap,
                                Map<String, BasePlaceRepository> basePlaceRepositoryMap,
                                Map<String, BaseReviewLikeRepository> baseReviewLikeMap) {
        super(baseReviewRepositoryMap, basePlaceRepositoryMap, baseReviewLikeMap);
    }

    @Override
    public Long createReview(PlaceEnum Type, Long placeId, ReviewPostReq reviewPostReq) {
        Optional<Hotel> place = basePlaceRepositoryMap.get(Type.getPlace()).findByPlaceId(placeId);
        BaseReviewRepository baseReviewRepository = baseReviewRepositoryMap.get(Type.getRepository());


        // NotFoundException 턴지기
        if(!place.isPresent()) throw new PlaceNotFoundException();


        HotelReview baseReview = HotelReview.builder()
                .score(reviewPostReq.getScore())
                .content(reviewPostReq.getContent())
                .likeCnt(0L)
                .place(place.get())
                .build();


        baseReviewRepository.save(baseReview);
        return baseReview.getReviewId();
    }

    @Override
    @Transactional
    public Boolean reviewLike(PlaceEnum Type, Long userId, Long reviewId) {
        BaseReviewRepository baseReviewRepository = baseReviewRepositoryMap.get(Type.getRepository());
        BaseReviewLikeRepository baseReviewRLikeRepository = baseReviewLikeMap.get(Type.getReviewLikeRepository());

        Optional<HotelReview> reviewOpt = baseReviewRepository.findById(reviewId);
        Optional<User> userOpt = userRepository.findById(userId);

        if (!userOpt.isPresent()) throw new UserNotFoundException();
        if (!reviewOpt.isPresent()) throw new ReviewNotFoundException();


        Optional<HotelReviewLike> reviewLike= baseReviewRLikeRepository.findByUserAndReview(userOpt.get(),reviewOpt.get());

        if(reviewLike.isPresent()){
            reviewOpt.get().addLikeCnt(-1);
            baseReviewRLikeRepository.deleteById(reviewLike.get().getReviewLikeId());
        } else {
            reviewOpt.get().addLikeCnt(1);
            baseReviewRLikeRepository.save(HotelReviewLike.builder()
                    .user(userOpt.get())
                    .review(reviewOpt.get())
                    .build());
        }


        return true;
    }
}
