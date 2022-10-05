package com.ssafy.fullcourse.domain.review.repository.baserepository;

import com.ssafy.fullcourse.domain.place.entity.baseentity.BasePlace;
import com.ssafy.fullcourse.domain.review.entity.baseentity.BaseReview;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;


//@Repository
@NoRepositoryBean
public interface BaseReviewRepository<R extends BaseReview, P extends BasePlace> extends JpaRepository<R, Long> {
    Page<R> findByPlaceOrderByRegDateDesc(P place, Pageable pageable);

}