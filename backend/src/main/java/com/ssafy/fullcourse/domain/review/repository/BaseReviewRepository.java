package com.ssafy.fullcourse.domain.review.repository;

import com.ssafy.fullcourse.domain.place.entity.Activity;
import com.ssafy.fullcourse.domain.place.entity.BasePlace;
import com.ssafy.fullcourse.domain.review.entity.BaseReview;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;


//@Repository
@NoRepositoryBean
public interface BaseReviewRepository<R extends BaseReview, P extends BasePlace> extends JpaRepository<R, Long> {
    Page<R> findByPlace(P place, Pageable pageable);

}