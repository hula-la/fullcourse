package com.ssafy.fullcourse.domain.sharefullcourse.repository;

import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFCComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SharedFCCommentRepository extends JpaRepository<SharedFCComment, Long> {
    Optional<SharedFCComment> findByFcCommentId(Long commentId);
    List<SharedFCComment> findAllBySharedFullCourse_SharedFcId(Long sharedFcId);
}
