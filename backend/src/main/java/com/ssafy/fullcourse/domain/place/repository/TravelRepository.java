package com.ssafy.fullcourse.domain.place.repository;

import com.ssafy.fullcourse.domain.place.entity.Travel;
import com.ssafy.fullcourse.domain.place.entity.TravelTag;
import com.ssafy.fullcourse.domain.place.repository.baserepository.BasePlaceRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;


@Repository
public interface TravelRepository extends BasePlaceRepository<Travel> {
    Page<Travel> findByTravelTags(TravelTag tag, Pageable pageable);
}
