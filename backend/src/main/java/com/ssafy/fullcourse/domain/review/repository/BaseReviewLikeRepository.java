package com.ssafy.fullcourse.domain.review.repository;

import com.ssafy.fullcourse.domain.review.entity.BaseReview;
import com.ssafy.fullcourse.domain.review.entity.BaseReviewLike;
import com.ssafy.fullcourse.domain.review.entity.CultureReviewLike;
import com.ssafy.fullcourse.domain.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BaseReviewLikeRepository<RL extends BaseReviewLike> extends JpaRepository<RL,Long> {
    Optional<RL> findByUser_UserIdAndReview_ReviewId(Long userId, Long reviewId);
}
