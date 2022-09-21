package com.ssafy.fullcourse.domain.fullcourse.application;

import com.ssafy.fullcourse.domain.fullcourse.dto.FullCourseDetailPostReq;
import com.ssafy.fullcourse.domain.fullcourse.dto.FullCoursePostReq;
import com.ssafy.fullcourse.domain.fullcourse.dto.FullCourseRes;
import com.ssafy.fullcourse.domain.fullcourse.dto.FullCourseTotalRes;
import com.ssafy.fullcourse.domain.fullcourse.entity.FullCourse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface FullCourseService {
    Long createFullCourse(String userId, FullCoursePostReq fullCoursePostReq);

    Long createFullCourseDetail(int day, FullCourse fullCourse, FullCourseDetailPostReq fcDetail);

    Page<FullCourseRes> getFullCourse(Long fcId, Pageable pageable);

    FullCourseTotalRes getFullCourseDetailById(Long fcId);

    void deleteFullCourse(Long fcId);

    Long updateFullCourse(String userId, Long fcId, FullCoursePostReq fullCoursePostReq);

}
