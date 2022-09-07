package com.ssafy.fullcourse.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TravelTag {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long travelTagId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Tag tagContent;

    @OneToMany(mappedBy = "travelTag", cascade = CascadeType.REMOVE)
    private List<TravelTagCnt> travelTagCnts = new ArrayList<>();

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "travelId")
    private Travel travel;
}
