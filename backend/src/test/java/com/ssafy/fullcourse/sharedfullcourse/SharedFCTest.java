package com.ssafy.fullcourse.sharedfullcourse;


import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.fullcourse.domain.fullcourse.entity.FullCourse;
import com.ssafy.fullcourse.domain.fullcourse.entity.FullCourseDetail;
import com.ssafy.fullcourse.domain.fullcourse.entity.QFullCourse;
import com.ssafy.fullcourse.domain.fullcourse.entity.QFullCourseDetail;
import com.ssafy.fullcourse.domain.place.entity.*;
import com.ssafy.fullcourse.domain.sharefullcourse.entity.QSharedFCTag;
import com.ssafy.fullcourse.domain.sharefullcourse.entity.QSharedFullCourse;
import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFullCourse;
import com.ssafy.fullcourse.domain.sharefullcourse.repository.SharedFCRepository;
import io.swagger.models.auth.In;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
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
    QFullCourse fullCourse = QFullCourse.fullCourse;
    QFullCourseDetail fullCourseDetail = QFullCourseDetail.fullCourseDetail;
    QActivity activity = QActivity.activity;
    QTravel travel = QTravel.travel;
    QRestaurant restaurant = QRestaurant.restaurant;
    QHotel hotel = QHotel.hotel;
    QCulture culture = QCulture.culture;


    private BooleanExpression eqActivity(List<String> places){
        return places != null ? Expressions.anyOf(places.stream().map(this::isFilterActivity).toArray(BooleanExpression[]::new)):null;
    }
    private BooleanExpression eqTravel(List<String> places){
        return places != null ? Expressions.anyOf(places.stream().map(this::isFilterTravel).toArray(BooleanExpression[]::new)):null;
    }
    private BooleanExpression eqRestaurant(List<String> places){
        return places != null ? Expressions.anyOf(places.stream().map(this::isFilterRestaurant).toArray(BooleanExpression[]::new)):null;
    }
    private BooleanExpression eqHotel(List<String> places){
        return places != null ? Expressions.anyOf(places.stream().map(this::isFilterHotel).toArray(BooleanExpression[]::new)):null;
    }
    private BooleanExpression eqCulture(List<String> places){
        return places != null ? Expressions.anyOf(places.stream().map(this::isFilterCulture).toArray(BooleanExpression[]::new)):null;
    }

    private BooleanExpression isFilterActivity(String place){
        return activity.name.contains(place);
    }
    private BooleanExpression isFilterTravel(String place){
        return travel.name.contains(place);
    }
    private BooleanExpression isFilterRestaurant(String place){
        return restaurant.name.contains(place);
    }
    private BooleanExpression isFilterHotel(String place){
        return hotel.name.contains(place);
    }
    private BooleanExpression isFilterCulture(String place){
        return culture.name.contains(place);
    }

    @Test
    void findByTagsAndDays(){

        List<Integer> days = new ArrayList<>();
        days.add(2);
        days.add(5);
//        List<String> tags = null;
        List<String> tags = new ArrayList<>();
        tags.add("초록초록");
        tags.add("핫플");
        List<Long> correct = new ArrayList<>();
        correct.add(6l);
        correct.add(7l);

        // 풀코스 테이블에서 shared_fc_id 가져오기
        List<String> places = new ArrayList<>();
        places.add("부산");
        places.add("서프");


        BooleanBuilder builder = new BooleanBuilder();
        List<Long> fcIds = new ArrayList<>();
        if(tags.size() != 0) builder.and(sharedFullCourse.sharedFcId.in(
                JPAExpressions.select(sharedFCTag.sharedFullCourse.sharedFcId)
                        .from(sharedFCTag)
                        .where(sharedFCTag.tagContent.in(tags))));

        if(days.size() != 0) builder.and(sharedFullCourse.day.in(days));

        if(places.size() != 0){
            fcIds.addAll(queryFactory
                    .select(fullCourseDetail.fullCourse.fcId).distinct()
                    .from(fullCourseDetail)
                    .leftJoin(activity)
                    .on(fullCourseDetail.placeId.eq(activity.placeId))
                    .where(eqActivity(places))
                    .distinct()
                    .fetch());
            fcIds.addAll(queryFactory
                    .select(fullCourseDetail.fullCourse.fcId).distinct()
                    .from(fullCourseDetail)
                    .leftJoin(travel)
                    .on(fullCourseDetail.placeId.eq(travel.placeId))
                    .where(eqTravel(places))
                    .distinct()
                    .fetch());
            fcIds.addAll(queryFactory
                    .select(fullCourseDetail.fullCourse.fcId).distinct()
                    .from(fullCourseDetail)
                    .leftJoin(restaurant)
                    .on(fullCourseDetail.placeId.eq(restaurant.placeId))
                    .where(eqRestaurant(places))
                    .distinct()
                    .fetch());
            fcIds.addAll(queryFactory
                    .select(fullCourseDetail.fullCourse.fcId).distinct()
                    .from(fullCourseDetail)
                    .leftJoin(hotel)
                    .on(fullCourseDetail.placeId.eq(hotel.placeId))
                    .where(eqHotel(places))
                    .distinct()
                    .fetch());
            fcIds.addAll(queryFactory
                    .select(fullCourseDetail.fullCourse.fcId).distinct()
                    .from(fullCourseDetail)
                    .leftJoin(culture)
                    .on(fullCourseDetail.placeId.eq(culture.placeId))
                    .where(eqCulture(places))
                    .distinct()
                    .fetch());
        }

        if(fcIds.size() != 0) builder.and(sharedFullCourse.fullCourse.fcId.in(fcIds));

        List<SharedFullCourse> result = queryFactory
                .selectFrom(sharedFullCourse)
                .where(builder)
                .fetch();

        System.out.println(result.stream().map(m->m.getSharedFcId()).collect(Collectors.toList()).toString());

        then(result.stream().map(res->res.getSharedFcId()).collect(Collectors.toList()))
                .isEqualTo(correct);
    }

}
