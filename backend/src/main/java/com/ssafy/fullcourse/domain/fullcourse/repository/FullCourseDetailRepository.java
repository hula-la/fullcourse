package com.ssafy.fullcourse.domain.fullcourse.repository;

import com.ssafy.fullcourse.domain.fullcourse.entity.FullCourseDetail;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FullCourseDetailRepository extends JpaRepository<FullCourseDetail,Long> {
    List<FullCourseDetail> findByFullCourse_FcIdOrderByDayAscCourseOrderAsc(Long fcId);
}
