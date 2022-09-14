package com.ssafy.fullcourse.domain.place.repository;

import com.ssafy.fullcourse.domain.place.dto.ListReq;
import com.ssafy.fullcourse.domain.place.entity.Travel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TravelRepository extends JpaRepository<Travel, Long> {

    List<Travel> findAll();
    Travel findByPlaceId(Long placeId);
}
