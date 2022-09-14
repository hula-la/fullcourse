package com.ssafy.fullcourse.domain.sharefullcourse.repository;

import com.ssafy.fullcourse.domain.fullcourse.entity.FullCourse;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.persistence.criteria.CriteriaBuilder;

public interface FullCourseRepository extends JpaRepository<FullCourse, Integer> {
    FullCourse findByFcId(Long fcId);
}
