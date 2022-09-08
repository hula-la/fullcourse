package com.ssafy.fullcourse.domain.review.application;

import com.ssafy.fullcourse.domain.review.dto.ReviewPostReq;
import com.ssafy.fullcourse.domain.review.dto.ReviewRes;
import com.ssafy.fullcourse.domain.review.entity.BaseReview;
import com.ssafy.fullcourse.domain.review.exception.ReviewNotFoundException;
import com.ssafy.fullcourse.domain.review.repository.BaseReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("BaseReviewServiceImpl")
public class BaseReviewServiceImpl<R extends BaseReview> implements BaseReviewService<R>{

    @Autowired
    BaseReviewRepository<R> baseReviewRepository;

    @Override
    public void deleteReviewById(Long reviewId) {
        if(!baseReviewRepository.existsById(reviewId)) throw new ReviewNotFoundException();
        baseReviewRepository.deleteById(reviewId);
    }

    @Override
    public Long createReview(ReviewPostReq reviewPostReq) {
        R baseReview = (R) BaseReview.builder()
                .score(reviewPostReq.getScore())
                .content(reviewPostReq.getContent())
                .likeCnt(0L)
                .build();
        return baseReviewRepository.save(baseReview).getReviewId();
    }

    @Override
    public Page<ReviewRes> getReviews(Pageable pageable) {
        Page<R> page = baseReviewRepository.findAll(pageable);
        return page.map(ReviewRes::new);
    }

}
