package com.ssafy.fullcourse.domain.place.repository;

import com.ssafy.fullcourse.domain.place.entity.BasePlace;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@NoRepositoryBean
public interface BasePlaceRepository<P extends BasePlace> extends JpaRepository<P, Long> {

    Optional<P> findByPlaceId(Long placeId);
}
