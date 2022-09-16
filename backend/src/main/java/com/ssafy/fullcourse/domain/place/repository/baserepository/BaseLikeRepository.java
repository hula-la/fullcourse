package com.ssafy.fullcourse.domain.place.repository.baserepository;

import com.ssafy.fullcourse.domain.place.entity.baseentity.BaseLike;
import com.ssafy.fullcourse.domain.place.entity.baseentity.BasePlace;
import com.ssafy.fullcourse.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.Optional;

@NoRepositoryBean
public interface BaseLikeRepository<L extends BaseLike, P extends BasePlace> extends JpaRepository<L, Long> {
    Optional<L> findByUserAndPlace(User user, P place);
}
