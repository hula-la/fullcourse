package com.ssafy.fullcourse.domain.place.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
@Getter
@Setter
public class BasePlace {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long placeId;
}
