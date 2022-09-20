package com.ssafy.fullcourse.domain.sharefullcourse.repository;

import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFCTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SharedFCTagRepository extends JpaRepository<SharedFCTag, Long> {

}
