package com.ssafy.fullcourse.domain.sharefullcourse.repository;

import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFullCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SharedFCRepository extends JpaRepository<SharedFullCourse, Integer> {
    SharedFullCourse findBySharedFcId(Long shareFcId);
    SharedFullCourse findByFullCourseFcId(Long fcId);
}
