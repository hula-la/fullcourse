package com.ssafy.fullcourse.domain.sharefullcourse.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.fullcourse.domain.fullcourse.entity.QFullCourseDetail;
import com.ssafy.fullcourse.domain.place.entity.*;
import com.ssafy.fullcourse.domain.sharefullcourse.entity.QSharedFCTag;
import com.ssafy.fullcourse.domain.sharefullcourse.entity.QSharedFullCourse;
import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFullCourse;
import com.ssafy.fullcourse.global.util.QueryDslUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class SharedFCRepositoryCustom {

    private final JPAQueryFactory queryFactory;
    QSharedFullCourse sharedFullCourse = QSharedFullCourse.sharedFullCourse;
    QSharedFCTag sharedFCTag = QSharedFCTag.sharedFCTag;
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

    public Page<SharedFullCourse> searchByTagsAndDays(List<String> tags, List<Integer> days, List<String> places,
                                                      Pageable pageable){


        List<OrderSpecifier> ORDERS = new ArrayList<>();
        if(!pageable.getSort().isEmpty()){
            for(Sort.Order order : pageable.getSort()){
                Order direction = order.isAscending()?Order.ASC : Order.DESC;

                switch (order.getProperty()){
                    case "viewCnt":
                        ORDERS.add(QueryDslUtil.getSortedColum(direction,sharedFullCourse,"viewCnt"));
                        break;
                    case "likeCnt":
                        ORDERS.add(QueryDslUtil.getSortedColum(direction,sharedFullCourse,"likeCnt"));
                    case "commentCnt":
                        ORDERS.add(QueryDslUtil.getSortedColum(direction,sharedFullCourse,"commentCnt"));
                    case "regDate":
                        ORDERS.add(QueryDslUtil.getSortedColum(direction,sharedFullCourse,"regDate"));
                    default:
                        break;
                }

            }
        }

        BooleanBuilder builder = new BooleanBuilder();

        if(tags.size() != 0) builder.and(sharedFullCourse.sharedFcId.in(
                JPAExpressions.select(sharedFCTag.sharedFullCourse.sharedFcId)
                        .from(sharedFCTag)
                        .where(sharedFCTag.tagContent.in(tags))));
        if(days.size() != 0) builder.and(sharedFullCourse.day.in(days));


        List<Long> fcIds = new ArrayList<>();
        if(places.size() != 0){
            fcIds.addAll(queryFactory
                    .select(fullCourseDetail.fullCourse.fcId).distinct()
                    .from(fullCourseDetail)
                    .leftJoin(activity)
                    .on(fullCourseDetail.placeId.eq(activity.placeId))
                    .where(eqActivity(places))
                    .distinct()
                    .fetch()
                    .stream().filter(item-> !fcIds.contains(item)).collect(Collectors.toList()));
            fcIds.addAll(queryFactory
                    .select(fullCourseDetail.fullCourse.fcId).distinct()
                    .from(fullCourseDetail)
                    .leftJoin(travel)
                    .on(fullCourseDetail.placeId.eq(travel.placeId))
                    .where(eqTravel(places))
                    .distinct()
                    .fetch()
                    .stream().filter(item-> !fcIds.contains(item)).collect(Collectors.toList()));
            fcIds.addAll(queryFactory
                    .select(fullCourseDetail.fullCourse.fcId).distinct()
                    .from(fullCourseDetail)
                    .leftJoin(restaurant)
                    .on(fullCourseDetail.placeId.eq(restaurant.placeId))
                    .where(eqRestaurant(places))
                    .distinct()
                    .fetch()
                    .stream().filter(item-> !fcIds.contains(item)).collect(Collectors.toList()));
            fcIds.addAll(queryFactory
                    .select(fullCourseDetail.fullCourse.fcId).distinct()
                    .from(fullCourseDetail)
                    .leftJoin(hotel)
                    .on(fullCourseDetail.placeId.eq(hotel.placeId))
                    .where(eqHotel(places))
                    .distinct()
                    .fetch()
                    .stream().filter(item-> !fcIds.contains(item)).collect(Collectors.toList()));
            fcIds.addAll(queryFactory
                    .select(fullCourseDetail.fullCourse.fcId).distinct()
                    .from(fullCourseDetail)
                    .leftJoin(culture)
                    .on(fullCourseDetail.placeId.eq(culture.placeId))
                    .where(eqCulture(places))
                    .distinct()
                    .fetch()
                    .stream().filter(item-> !fcIds.contains(item)).collect(Collectors.toList()));
        }

        builder.and(sharedFullCourse.fullCourse.fcId.in(fcIds));


        List<SharedFullCourse> result = queryFactory
                .selectFrom(sharedFullCourse)
                .where(builder)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(ORDERS.stream().toArray(OrderSpecifier[]::new))
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
