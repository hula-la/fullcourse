package com.ssafy.fullcourse.domain.place.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateCustomReq {
    private Long userId;
    private String name;
    private Float lat;
    private Float lng;
    private String address;
    private String content;
}
