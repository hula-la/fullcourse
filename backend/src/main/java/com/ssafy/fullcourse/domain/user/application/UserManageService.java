package com.ssafy.fullcourse.domain.user.application;

import com.ssafy.fullcourse.domain.user.dto.UserDto;
import com.ssafy.fullcourse.domain.user.entity.User;
import com.ssafy.fullcourse.domain.user.repository.UserRepository;
import com.ssafy.fullcourse.global.util.AwsS3Service;
import com.ssafy.fullcourse.global.util.TokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;

@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserManageService {

    private final UserRepository userRepository;
    private final TokenProvider tokenProvider;
    private final AwsS3Service awsS3Service;
    private final String defaultImg = "https://busanfullcourse.s3.ap-northeast-2.amazonaws.com/user/%ED%94%84%EB%A1%9C%ED%95%84.png";

    public UserDto getInfo(HttpServletRequest request) {
        String token = request.getHeader("access-token");
        if (!tokenProvider.validateToken(token)) {
            return null;
        }

        String userEmail = String.valueOf(tokenProvider.getPayload(token).get("sub"));
        User findUser = userRepository.findByEmail(userEmail).get();

        return findUser.toDto();
    }

    @Transactional
    public UserDto modify(UserDto userDto, MultipartFile file, HttpServletRequest request) {
        String token = request.getHeader("access-token");
        if (!tokenProvider.validateToken(token)) {
            return null;
        }

        String userEmail = String.valueOf(tokenProvider.getPayload(token).get("sub"));
        User findUser = userRepository.findByEmail(userEmail).get();

        if(file == null) {
            findUser.update(userDto.getNickname(), findUser.getImgUrl());
        } else {
            if (!findUser.getImgUrl().equals(defaultImg)) {
                awsS3Service.delete(findUser.getImgUrl());
            }
            userDto.setFile(file);
            findUser.update(userDto.getNickname(), awsS3Service.uploadImage(userDto.getFile()));
        }

        userRepository.save(findUser);
        return findUser.toDto();
    }


    @Transactional
    public boolean delete(HttpServletRequest request) {
        String token = request.getHeader("access-token");
        if (!tokenProvider.validateToken(token)) {
            return false;
        }

        String userEmail = String.valueOf(tokenProvider.getPayload(token).get("sub"));
        User findUser = userRepository.findByEmail(userEmail).get();

        userRepository.delete(findUser);

        if (userRepository.findByEmail(userEmail).orElse(null) != null) {
            return false;
        }

        if (!findUser.getImgUrl().equals(defaultImg)) {
            awsS3Service.delete(findUser.getImgUrl());
        }

        return true;
    }

    public boolean checkNickname(String nickname) {
        User user = userRepository.findByNickname(nickname).orElse(null);
        return user == null;
    }

}