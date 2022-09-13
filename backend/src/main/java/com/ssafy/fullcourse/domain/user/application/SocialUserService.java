package com.ssafy.fullcourse.domain.user.application;

import com.ssafy.fullcourse.domain.user.dto.UserDto;
import org.springframework.http.HttpEntity;

public interface SocialUserService {
    UserDto getUserInfoByAccessToken(String access_token);
    UserDto StringToDto(String userInfo);
    HttpEntity<? extends Object> login(UserDto userDto);
}
