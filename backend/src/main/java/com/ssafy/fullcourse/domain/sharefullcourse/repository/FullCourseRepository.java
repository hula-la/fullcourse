package com.ssafy.fullcourse.domain.sharefullcourse.repository;

import com.ssafy.fullcourse.domain.fullcourse.entity.FullCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.criteria.CriteriaBuilder;
@Repository
public interface FullCourseRepository extends JpaRepository<FullCourse, Integer> {
    FullCourse findByFcId(Long fcId);
}
