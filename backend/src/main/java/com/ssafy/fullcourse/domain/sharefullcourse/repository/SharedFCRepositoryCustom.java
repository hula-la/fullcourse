package com.ssafy.fullcourse.domain.sharefullcourse.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.fullcourse.domain.sharefullcourse.entity.QSharedFCTag;
import com.ssafy.fullcourse.domain.sharefullcourse.entity.QSharedFullCourse;
import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFullCourse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class SharedFCRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public Page<SharedFullCourse> searchByTagsAndDays(List<String> tags, List<Integer> days, Pageable pageable){

        QSharedFullCourse sharedFullCourse = QSharedFullCourse.sharedFullCourse;
        QSharedFCTag sharedFCTag = QSharedFCTag.sharedFCTag;

        BooleanBuilder builder = new BooleanBuilder();

        if(tags != null) builder.and(sharedFullCourse.sharedFcId.in(
                JPAExpressions.select(sharedFCTag.sharedFullCourse.sharedFcId)
                        .from(sharedFCTag)
                        .where(sharedFCTag.tagContent.in(tags))));
        if(days != null) builder.and(sharedFullCourse.day.in(days));

        List<SharedFullCourse> result = queryFactory
                .selectFrom(sharedFullCourse)
                .where(builder)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
        // count 쿼리를 따로 날려줌
        JPAQuery<SharedFullCourse> countQuery = queryFactory
                .selectFrom(sharedFullCourse)
                .where(builder);
        //5.0.0 버전에서 fetchCount 가 deprecated 됨.
        //fetchCount() 대신 fetch().size() 로 동일한 결과를 얻을 수 있음
        return PageableExecutionUtils.getPage(result, pageable, () -> countQuery.fetch().size());
    }


}
