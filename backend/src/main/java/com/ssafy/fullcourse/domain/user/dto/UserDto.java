package com.ssafy.fullcourse.domain.user.dto;


import com.ssafy.fullcourse.domain.user.entity.Gender;
import com.ssafy.fullcourse.domain.user.entity.LoginType;
import com.ssafy.fullcourse.domain.user.entity.User;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class UserDto {

    private String email;
    private String socialId;
    private String nickname;
    private String imgUrl;
    private String loginType;
    private Gender gender;
    private String birth;
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
                .birth(this.getBirth())
//                .authorities(Collections.singleton(authority))
                .build();
    }
}
