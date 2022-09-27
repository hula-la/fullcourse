package com.ssafy.fullcourse.domain.place.repository;

import com.ssafy.fullcourse.domain.place.entity.Activity;
import com.ssafy.fullcourse.domain.place.entity.Travel;
import com.ssafy.fullcourse.domain.place.repository.baserepository.BasePlaceRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface TravelRepository extends BasePlaceRepository<Travel> {

    @Query(value = "SELECT * FROM hackerton.literature order by RAND()",nativeQuery = true)
    List<Travel> findRandomAll();
}
