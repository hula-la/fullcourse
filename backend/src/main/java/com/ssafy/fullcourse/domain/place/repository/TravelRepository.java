package com.ssafy.fullcourse.domain.place.repository;

import com.ssafy.fullcourse.domain.place.entity.Travel;
import com.ssafy.fullcourse.domain.place.repository.baserepository.BasePlaceRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TravelRepository extends BasePlaceRepository<Travel> {
}
