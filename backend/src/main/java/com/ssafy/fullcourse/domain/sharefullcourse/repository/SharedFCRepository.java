package com.ssafy.fullcourse.domain.sharefullcourse.repository;

import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFullCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface SharedFCRepository extends JpaRepository<SharedFullCourse, Long> {
    SharedFullCourse findBySharedFcId(Long shareFcId);
    SharedFullCourse findByFullCourseFcId(Long fcId);

    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE shared_full_course sfc SET sfc.like_cnt = sfc.like_cnt + 1 where shared_fc_id = :sharedFcId",nativeQuery = true)
    int plusLikeCnt(@Param(value="sharedFcId") Long sharedFcId);


    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE shared_full_course sfc SET sfc.comment_cnt = sfc.comment_cnt + 1 where shared_fc_id = :sharedFcId",nativeQuery = true)
    int plusCommentCnt(@Param(value="sharedFcId") Long sharedFcId);


    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE shared_full_course sfc SET sfc.view_cnt = sfc.view_cnt + 1 where shared_fc_id = :sharedFcId",nativeQuery = true)
    int plusViewCnt(@Param(value="sharedFcId") Long sharedFcId);


    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE shared_full_course sfc SET sfc.like_cnt = sfc.like_cnt - 1 where shared_fc_id = :sharedFcId",nativeQuery = true)
    int minusLikeCnt(@Param(value="sharedFcId") Long sharedFcId);


    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE shared_full_course sfc SET sfc.comment_cnt = sfc.comment_cnt - 1 where shared_fc_id = :sharedFcId",nativeQuery = true)
    int minusCommentCnt(@Param(value="sharedFcId") Long sharedFcId);

}
