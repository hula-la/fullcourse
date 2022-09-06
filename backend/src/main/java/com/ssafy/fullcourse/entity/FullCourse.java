package com.ssafy.fullcourse.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FullCourse {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fcId;

    @Column(nullable = false)
    private Date regDate;

    @Column(nullable = false, length = 3)
    private Integer period;
}
