package com.ssafy.fullcourse.domain.user.dto;


import com.ssafy.fullcourse.domain.user.entity.Gender;
import com.ssafy.fullcourse.domain.user.entity.LoginType;
import com.ssafy.fullcourse.domain.user.entity.User;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.stream.Collectors;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private String email;
    private String socialId;
    private String nickname;
    private String imgUrl;
    private String loginType;
    private Gender gender;
    private String ageRange;
    private MultipartFile file;


    public User toEntity(LoginType loginType){

//        Authority authority = Authority.builder()
//                .authorityName("ROLE_USER")
//                .build();



        return User.builder()
                .email(this.getEmail())
                .socialId(this.getSocialId())
                .imgUrl(this.getImgUrl())
                .nickname(this.getNickname())
                .loginType(loginType)
                .gender(this.getGender())
                .ageRange(this.getAgeRange())
//                .authorities(Collections.singleton(authority))
                .build();
    }
}
