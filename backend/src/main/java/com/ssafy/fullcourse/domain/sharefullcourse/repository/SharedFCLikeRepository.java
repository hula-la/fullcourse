package com.ssafy.fullcourse.domain.sharefullcourse.repository;

import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFCLike;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface SharedFCLikeRepository extends JpaRepository<SharedFCLike,Long> {

    SharedFCLike findByUser_UserIdAndSharedFullCourse_SharedFcId(Long userId, Long shareFcdId);

}
