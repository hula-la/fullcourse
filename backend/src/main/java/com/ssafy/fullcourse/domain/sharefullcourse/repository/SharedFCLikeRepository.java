package com.ssafy.fullcourse.domain.sharefullcourse.repository;

import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFCLike;
import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFullCourse;
import com.ssafy.fullcourse.domain.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SharedFCLikeRepository extends JpaRepository<SharedFCLike,Long> {

    SharedFCLike findByUser_UserIdAndSharedFullCourse_SharedFcId(Long userId, Long shareFcdId);

    Page<SharedFCLike> findFCLikeByUser(User user, Pageable pageable);
}
