package com.ssafy.fullcourse.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Custom {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long customId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Float lat;

    @Column(nullable = false)
    private Float lng;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String content;
}
