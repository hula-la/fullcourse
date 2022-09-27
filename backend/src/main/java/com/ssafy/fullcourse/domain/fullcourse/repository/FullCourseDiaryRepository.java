package com.ssafy.fullcourse.domain.fullcourse.repository;

import com.ssafy.fullcourse.domain.fullcourse.entity.FullCourseDiary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FullCourseDiaryRepository extends JpaRepository<FullCourseDiary,Long> {
    Optional<FullCourseDiary> findByFullCourseDetail_FcDetailId(Long fcDetailId);
}
