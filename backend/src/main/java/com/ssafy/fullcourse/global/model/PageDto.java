package com.ssafy.fullcourse.global.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PageDto {

    String keyword;
    Integer page;
    Integer size;
    String sort;
}
