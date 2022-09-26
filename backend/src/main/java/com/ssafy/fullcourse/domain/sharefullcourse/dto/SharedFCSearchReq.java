package com.ssafy.fullcourse.domain.sharefullcourse.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class SharedFCSearchReq {

    List<String> tags;
    List<Integer> days;
    String place;

}
