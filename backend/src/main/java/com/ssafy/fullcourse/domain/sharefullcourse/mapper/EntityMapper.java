package com.ssafy.fullcourse.domain.sharefullcourse.mapper;

public interface EntityMapper<D,E> {

    E toEntity (final D Dto);
    D toDto (final E Entity);

}
