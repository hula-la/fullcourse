package com.ssafy.fullcourse.domain.review.application.BaseService;

import com.ssafy.fullcourse.domain.place.entity.BasePlace;
import com.ssafy.fullcourse.domain.place.repository.BasePlaceRepository;
import com.ssafy.fullcourse.domain.review.dto.ReviewPostReq;
import com.ssafy.fullcourse.domain.review.dto.ReviewRes;
import com.ssafy.fullcourse.domain.review.entity.ActivityReview;
import com.ssafy.fullcourse.domain.review.entity.BaseReview;
import com.ssafy.fullcourse.domain.review.entity.BaseReviewLike;
import com.ssafy.fullcourse.domain.review.exception.PlaceNotFoundException;
import com.ssafy.fullcourse.domain.review.exception.ReviewNotFoundException;
import com.ssafy.fullcourse.domain.review.repository.BaseReviewLikeRepository;
import com.ssafy.fullcourse.domain.review.repository.BaseReviewRepository;
import com.ssafy.fullcourse.global.model.PlaceEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;

public class BaseReviewServiceImpl<R extends BaseReview, P extends BasePlace, RL extends BaseReviewLike> implements BaseReviewService<R,P> {



    protected final Map<String, BasePlaceRepository> basePlaceRepositoryMap;

    protected final Map<String, BaseReviewRepository> baseReviewRepositoryMap;
    protected final Map<String, BaseReviewLikeRepository> baseReviewLikeMap;

    @Autowired
    public BaseReviewServiceImpl(Map<String, BaseReviewRepository> baseReviewRepositoryMap,
                                 Map<String, BasePlaceRepository> basePlaceRepositoryMap,
                                 Map<String, BaseReviewLikeRepository> baseReviewLikeMap) {
        this.baseReviewRepositoryMap = baseReviewRepositoryMap;
        this.basePlaceRepositoryMap = basePlaceRepositoryMap;
        this.baseReviewLikeMap = baseReviewLikeMap;

        //의존관계 주입 확인을 위해 출력
        System.out.println("baseReviewRepositoryMap = " + baseReviewRepositoryMap);
        System.out.println("basePlaceRepositoryMap = " + basePlaceRepositoryMap);
    }



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
    public Long createReview(PlaceEnum Type, Long placeId, ReviewPostReq reviewPostReq) {
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
    public Long reviewLike(PlaceEnum Type, Long reviewId,Long userId) {
        BaseReviewRepository baseReviewRepository = baseReviewRepositoryMap.get(Type.getRepository());
        Optional<R> review = baseReviewRepository.findById(reviewId);

        BaseReviewLikeRepository baseReviewRLikeepository = baseReviewLikeMap.get(Type.getReviewLikeRepository());

        Optional<RL> reviewLike= baseReviewRLikeepository.findByUser_UserIdAndReview_ReviewId(userId,reviewId);

        if(!review.isPresent()) throw new ReviewNotFoundException();
        review.get().update(reviewPostReq.getContent(), reviewPostReq.getScore());

        return reviewId;
    }

    @Transactional
    public boolean checkLike(PlaceEnum Type, Long userId, Long reviewId) {
        BaseReviewLikeRepository baseReviewRepository = baseReviewLikeMap.get(Type.getReviewLikeRepository());

        Optional<RL> reviewLike= baseReviewRepository.findByUser_UserIdAndReview_ReviewId(userId,reviewId);

        return reviewLike.isPresent();
    }



    @Transactional
    public long getPostLikeNum(PostLikeDto postLikeDto) {
        return postLikeRepository.findPostLikeNum(postLikeDto.getBoardId());
    }

    public Boolean pushLikeButton(PostLikeDto postLikeDto) {
        postLikeRepository.exist(postLikeDto.getStudent().getId(), postLikeDto.getBoardId())
                .ifPresentOrElse(
                        postLike -> postLikeRepository.deleteById(postLike.getId()),
                        () -> {
                            Board board = getBoard(postLikeDto);
                            postLikeRepository.save(new PostLike(postLikeDto.getStudent(), board, LocalDateTime.now()));
                        });

        return true;
    }

}
