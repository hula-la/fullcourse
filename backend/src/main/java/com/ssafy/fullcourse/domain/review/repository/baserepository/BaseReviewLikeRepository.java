package com.ssafy.fullcourse.domain.review.repository.baserepository;

import com.ssafy.fullcourse.domain.review.entity.baseentity.BaseReview;
import com.ssafy.fullcourse.domain.review.entity.baseentity.BaseReviewLike;
import com.ssafy.fullcourse.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.Optional;

@NoRepositoryBean
public interface BaseReviewLikeRepository<RL extends BaseReviewLike, R extends BaseReview> extends JpaRepository<RL,Long> {
    Optional<RL> findByUserAndReview(User user, R review);
}
