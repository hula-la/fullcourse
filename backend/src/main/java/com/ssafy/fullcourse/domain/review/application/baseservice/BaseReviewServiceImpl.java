package com.ssafy.fullcourse.domain.review.application.baseservice;

import com.ssafy.fullcourse.domain.place.entity.baseentity.BasePlace;
import com.ssafy.fullcourse.domain.place.repository.baserepository.BasePlaceRepository;
import com.ssafy.fullcourse.domain.review.dto.ReviewPostReq;
import com.ssafy.fullcourse.domain.review.dto.ReviewRes;
import com.ssafy.fullcourse.domain.review.entity.ActivityReview;
import com.ssafy.fullcourse.domain.review.entity.baseentity.BaseReview;
import com.ssafy.fullcourse.domain.review.entity.baseentity.BaseReviewLike;
import com.ssafy.fullcourse.domain.review.exception.PlaceNotFoundException;
import com.ssafy.fullcourse.domain.review.exception.ReviewNotFoundException;
import com.ssafy.fullcourse.domain.review.repository.baserepository.BaseReviewLikeRepository;
import com.ssafy.fullcourse.domain.review.repository.baserepository.BaseReviewRepository;
import com.ssafy.fullcourse.domain.user.entity.User;
import com.ssafy.fullcourse.domain.user.exception.UserNotFoundException;
import com.ssafy.fullcourse.domain.user.repository.UserRepository;
import com.ssafy.fullcourse.global.model.PlaceEnum;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.transaction.Transactional;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
public class BaseReviewServiceImpl<R extends BaseReview, P extends BasePlace, RL extends BaseReviewLike>
        implements BaseReviewService<R,P> {



    protected final Map<String, BaseReviewRepository> baseReviewRepositoryMap;
    protected final Map<String, BasePlaceRepository> basePlaceRepositoryMap;
    protected final Map<String, BaseReviewLikeRepository> baseReviewLikeMap;

    protected final UserRepository userRepository;

//    @Autowired
//    public BaseReviewServiceImpl(Map<String, BaseReviewRepository> baseReviewRepositoryMap,
//                                 Map<String, BasePlaceRepository> basePlaceRepositoryMap,
//                                 Map<String, BaseReviewLikeRepository> baseReviewLikeMap) {
//        this.baseReviewRepositoryMap = baseReviewRepositoryMap;
//        this.basePlaceRepositoryMap = basePlaceRepositoryMap;
//        this.baseReviewLikeMap = baseReviewLikeMap;
//
//        //의존관계 주입 확인을 위해 출력
//        System.out.println("baseReviewRepositoryMap = " + baseReviewRepositoryMap);
//        System.out.println("basePlaceRepositoryMap = " + basePlaceRepositoryMap);
//    }



    @Override
    public void deleteReviewById(PlaceEnum Type, Long reviewId) {
        BaseReviewRepository baseReviewRepository = baseReviewRepositoryMap.get(Type.getRepository());
        Optional<R> review = baseReviewRepository.findById(reviewId);

        if(!review.isPresent()) throw new ReviewNotFoundException();

//        System.out.println(review.get() instanceof CultureReview); //

        baseReviewRepository.deleteById(reviewId);
    }



    @Override
    @Transactional
    public Long createReview(PlaceEnum Type, Long placeId, String userId, ReviewPostReq reviewPostReq) {
        Optional<P> place = basePlaceRepositoryMap.get(Type.getPlace()).findByPlaceId(placeId);
        BaseReviewRepository baseReviewRepository = baseReviewRepositoryMap.get(Type.getRepository());

        // NotFoundException 턴지기
        if(!place.isPresent()) throw new PlaceNotFoundException();


        R baseReview = (R) R.<P>builder()
                .score(reviewPostReq.getScore())
                .content(reviewPostReq.getContent())
                .likeCnt(0L)
                .place(place.get())
                .build();


        System.out.println((baseReview instanceof ActivityReview) +"**2****"+baseReview);
        baseReviewRepository.save(baseReview);
        return baseReview.getReviewId();
    }

    @Override
    public Page<ReviewRes> getReviews(PlaceEnum Type, Long placeId, Pageable pageable) {


        Optional<P> place = basePlaceRepositoryMap.get(Type.getPlace()).findByPlaceId(placeId);
        if(!place.isPresent()) throw new PlaceNotFoundException();
        Page<R> page = baseReviewRepositoryMap.get(Type.getRepository()).findByPlace(place.get(), pageable);
        return page.map(ReviewRes::new);
    }

    @Override
    @Transactional
    public Long update(PlaceEnum Type, Long reviewId,ReviewPostReq reviewPostReq) {
        BaseReviewRepository baseReviewRepository = baseReviewRepositoryMap.get(Type.getRepository());
        Optional<R> review = baseReviewRepository.findById(reviewId);
        if(!review.isPresent()) throw new ReviewNotFoundException();
        review.get().update(reviewPostReq.getContent(), reviewPostReq.getScore());

        return reviewId;
    }


    @Override
    @Transactional
    public Boolean reviewLike(PlaceEnum Type, String userId, Long reviewId) {
        BaseReviewRepository baseReviewRepository = baseReviewRepositoryMap.get(Type.getRepository());
        BaseReviewLikeRepository baseReviewRLikeRepository = baseReviewLikeMap.get(Type.getReviewLikeRepository());

        Optional<R> reviewOpt = baseReviewRepository.findById(reviewId);
        Optional<User> userOpt = userRepository.findByEmail(userId);

        if (!userOpt.isPresent()) throw new UserNotFoundException();
        if (!reviewOpt.isPresent()) throw new ReviewNotFoundException();



        Optional<RL> reviewLike= baseReviewRLikeRepository.findByUserAndReview(userOpt.get(),reviewOpt.get());

        if(reviewLike.isPresent()){
            reviewOpt.get().addLikeCnt(-1);
            baseReviewRLikeRepository.deleteById(reviewLike.get().getReviewLikeId());
        } else {
            reviewOpt.get().addLikeCnt(1);
            baseReviewRLikeRepository.save(BaseReviewLike.builder()
                    .user(userOpt.get())
                    .review(reviewOpt.get()));
        }


        return true;
    }

}
