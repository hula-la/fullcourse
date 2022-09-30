package com.ssafy.fullcourse.domain.place.repository;

import com.ssafy.fullcourse.domain.place.entity.Restaurant;
import com.ssafy.fullcourse.domain.place.repository.baserepository.BasePlaceRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface RestaurantRepository extends BasePlaceRepository<Restaurant> {
    List<Restaurant> findByNameContainingAndCategory(String name, String category);
    Page<Restaurant> findByNameContainingAndCategory(String name, String category, Pageable pageable);
    Page<Restaurant> findByCategory(String category, Pageable pageable);
    List<Restaurant> findByCategory(String category);
}
