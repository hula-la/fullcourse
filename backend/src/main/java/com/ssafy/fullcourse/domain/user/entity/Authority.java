//package com.ssafy.fullcourse.domain.user.entity;
//
//import lombok.*;
//
//import javax.persistence.*;
//
//import static javax.persistence.FetchType.LAZY;
//
//@Entity
//@Getter
//@Setter
//@Builder
//@AllArgsConstructor
//@NoArgsConstructor
//public class Authority {
//
//    @Id
//    @Column(length = 50)
//    private String authorityName;
//
//    @ManyToOne(fetch = LAZY)
//    @JoinColumn(name = "userId")
//    private User user;
//
//}
