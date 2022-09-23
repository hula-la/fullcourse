package com.ssafy.fullcourse.sharedfullcourse;


import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.fullcourse.domain.fullcourse.entity.QFullCourse;
import com.ssafy.fullcourse.domain.sharefullcourse.entity.QSharedFCTag;
import com.ssafy.fullcourse.domain.sharefullcourse.entity.QSharedFullCourse;
import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFullCourse;
import com.ssafy.fullcourse.domain.sharefullcourse.repository.SharedFCRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static org.assertj.core.api.BDDAssertions.then;

@SpringBootTest
public class SharedFCTest {

    @Autowired
    private JPAQueryFactory queryFactory;
    @Autowired
    private SharedFCRepository sharedFCRepository;

    QSharedFullCourse sharedFullCourse = QSharedFullCourse.sharedFullCourse;
    QSharedFCTag sharedFCTag = QSharedFCTag.sharedFCTag;

    @Test
    void basic(){

        List<Long> ids = new ArrayList<>();
        ids.add(8l);
        ids.add(9l);


        List<SharedFullCourse> result = queryFactory
                .selectFrom(QSharedFullCourse.sharedFullCourse)
                .leftJoin(QFullCourse.fullCourse)
                .on(QFullCourse.fullCourse.fcId.eq(QSharedFullCourse.sharedFullCourse.fullCourse.fcId))
                .where(QSharedFullCourse.sharedFullCourse.sharedFcId.in(ids))
                .fetch();

        then(ids).isEqualTo(result.stream().map(res->res.getSharedFcId()).collect(Collectors.toList()));

    }

    @Test
    void findByTagsAndDays(){

        List<Long> days = null;
        List<String> tags = new ArrayList<>();
        tags.add("초록초록");
        tags.add("핫플");
        List<Long> correct = new ArrayList<>();
        correct.add(6l);
        correct.add(7l);
        correct.add(12l);
        correct.add(13l);
        correct.add(14l);

        BooleanBuilder builder = new BooleanBuilder();

        if(tags != null) builder.or(sharedFCTag.tagContent.in(tags));


        List<SharedFullCourse> result = queryFactory
                .selectFrom( sharedFullCourse )
                .leftJoin(sharedFCTag)
                .on(sharedFCTag.sharedFullCourse.sharedFcId.eq(sharedFullCourse.sharedFcId))
                .where(builder)
                .distinct()
                .fetch();

        System.out.println(result.stream().map(m->m.getSharedFcId()).collect(Collectors.toList()).toString());

        then(result.stream().map(res->res.getSharedFcId()).collect(Collectors.toList()))
                .isEqualTo(correct);

    }
}
