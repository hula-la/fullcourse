package com.ssafy.fullcourse.domain.sharefullcourse.repository;

import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFCLike;
import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFullCourse;
import com.ssafy.fullcourse.domain.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SharedFCLikeRepository extends JpaRepository<SharedFCLike,Long> {

    Optional<SharedFCLike> findByUser_EmailAndSharedFullCourse(String email, SharedFullCourse sharedFullCourse);

    List<SharedFCLike> findFCLikeByUser(User user);
}
