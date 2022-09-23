package com.ssafy.fullcourse.domain.sharefullcourse.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.fullcourse.domain.sharefullcourse.entity.QSharedFullCourse;
import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFullCourse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@RequiredArgsConstructor
public class SharedFCListRepositoryCustom {

    @Autowired
    private final JPAQueryFactory queryFactory;

    public List<SharedFullCourse> searchByTagsAndDays(List<String> tag, List<Integer> days){
        QSharedFullCourse sfc = QSharedFullCourse.sharedFullCourse;

        BooleanBuilder builder = new BooleanBuilder();
        return null;
    }


}
