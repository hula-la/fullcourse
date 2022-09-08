package com.ssafy.fullcourse.domain.review.repository;

import com.ssafy.fullcourse.domain.review.entity.BaseReview;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.stereotype.Repository;

import javax.persistence.LockModeType;
import java.time.LocalDateTime;
import java.util.List;

@NoRepositoryBean
@Repository
public interface BaseReviewRepository<R extends BaseReview> extends JpaRepository<R, Long> {
//    List<BaseReview> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
//
//    @Query("SELECT t FROM #{#entityName} t WHERE t.id >= :id") // 이런식으로 T로 받은 제네릭을 JPQL에서도 활용 가능합니다.
//    List<BaseReview> findByBiggerId(ID id);
//
//    @Query("SELECT t FROM #{#entityName} t WHERE t.id = :id")
//    @Lock(LockModeType.PESSIMISTIC_WRITE)
//    BaseReview findByIdWithExclusiveLock(ID id);
//
//    @Query("SELECT t FROM #{#entityName} t WHERE t.id = :id")
//    @Lock(LockModeType.PESSIMISTIC_READ)
//    BaseReview findByIdWithSharedLock(ID id);
//

//    @Override
//    Page<BaseReview> findAll(Pageable pageable);

}