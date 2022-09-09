package com.ssafy.fullcourse.domain.sharefullcourse.mapper;

import com.ssafy.fullcourse.domain.sharefullcourse.dto.SharedFCDto;
import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFullCourse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface SharedFCMapper extends EntityMapper<SharedFCDto, SharedFullCourse>{

    SharedFCMapper MAPPER = Mappers.getMapper(SharedFCMapper.class);

    @Override
    @Mapping(target="sharedFcId", constant="777L")
    SharedFullCourse toEntity(final SharedFCDto dto);

}
