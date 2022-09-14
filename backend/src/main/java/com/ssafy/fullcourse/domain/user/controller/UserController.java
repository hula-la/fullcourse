package com.ssafy.fullcourse.domain.user.controller;

import com.ssafy.fullcourse.domain.user.application.KakaoUserService;
import com.ssafy.fullcourse.domain.user.application.NaverUserService;
//import com.ssafy.fullcourse.domain.user.application.UserManageService;
import com.ssafy.fullcourse.domain.user.application.UserManageService;
import com.ssafy.fullcourse.domain.user.dto.UserDto;
import com.ssafy.fullcourse.global.model.BaseResponseBody;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
@Slf4j
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final KakaoUserService kakaoUserService;
    private final NaverUserService naverUserService;
    private final UserManageService userManageService;

    @PostMapping("/kakao")
    public HttpEntity<?> kakaoLogin(@RequestBody HashMap<String, String> param) {
        kakaoUserService.getUserInfoByAccessToken(param.get("access_token"));
        UserDto userDto = kakaoUserService.getUserInfoByAccessToken(param.get("access_token"));
        return kakaoUserService.login(userDto);
    }

    @PostMapping("/naver")
    public HttpEntity<?> naverLogin(@RequestBody HashMap<String, String> param) {
        naverUserService.getUserInfoByAccessToken(param.get("access_token"));
        UserDto userDto = naverUserService.getUserInfoByAccessToken(param.get("access_token"));
        return naverUserService.login(userDto);
    }

    @GetMapping
    public ResponseEntity<BaseResponseBody> getInfo(HttpServletRequest request) {
        return userManageService.getInfo(request);
    }

    @PostMapping
    public ResponseEntity<BaseResponseBody> modify(
            @RequestPart(value = "file", required = false) MultipartFile file,
            @RequestPart(value = "userDto", required = false) UserDto userDto,
            HttpServletRequest request) {
        return userManageService.modify(userDto,file,request);
    }

    @DeleteMapping
    public ResponseEntity<BaseResponseBody> delete(HttpServletRequest request) {
        return userManageService.delete(request);
    }

}
