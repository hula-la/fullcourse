package com.ssafy.fullcourse.domain.fullcourse.repository;

import com.ssafy.fullcourse.domain.fullcourse.entity.FullCourse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FullCourseRepository  extends JpaRepository<FullCourse,Long> {
    Page<FullCourse> findByUser_Email(String email, Pageable pageable);
    FullCourse findByFcId(Long fcId);
}
