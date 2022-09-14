package com.ssafy.fullcourse.domain.user.application;

import com.ssafy.fullcourse.domain.user.dto.UserDto;
import com.ssafy.fullcourse.domain.user.entity.User;
import com.ssafy.fullcourse.domain.user.repository.UserRepository;
import com.ssafy.fullcourse.global.model.BaseResponseBody;
import com.ssafy.fullcourse.global.util.AwsS3Service;
import com.ssafy.fullcourse.global.util.TokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    public ResponseEntity<BaseResponseBody> getInfo(HttpServletRequest request) {
        String token = request.getHeader("access-token");
        if (!tokenProvider.validateToken(token)) {
            return ResponseEntity.status(204).body(BaseResponseBody.of(204, "유효하지 않은 토큰", null));
        }

        String userEmail = String.valueOf(tokenProvider.getPayload(token).get("sub"));
        User findUser = userRepository.findByEmail(userEmail).get();

        UserDto userDto = findUser.toDto();

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success", userDto));
    }
    @Transactional
    public ResponseEntity<BaseResponseBody> modify(UserDto userDto, MultipartFile file, HttpServletRequest request) {
        String token = request.getHeader("access-token");
        if (!tokenProvider.validateToken(token)) {
            return ResponseEntity.status(204).body(BaseResponseBody.of(204, "유효하지 않은 토큰", null));
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
            findUser.update(userDto.getNickname(), awsS3Service.uploadImge(userDto.getFile()));
        }

        userRepository.save(findUser);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success", null));
    }


    @Transactional
    public ResponseEntity<BaseResponseBody> delete(HttpServletRequest request) {
        String token = request.getHeader("access-token");
        if (!tokenProvider.validateToken(token)) {
            return ResponseEntity.status(204).body(BaseResponseBody.of(204, "유효하지 않은 토큰", null));
        }

        String userEmail = String.valueOf(tokenProvider.getPayload(token).get("sub"));
        User findUser = userRepository.findByEmail(userEmail).get();

        userRepository.delete(findUser);

        if (userRepository.findByEmail(userEmail).orElse(null) != null) {
            return ResponseEntity.status(204).body(BaseResponseBody.of(204, "삭제에 실패했습니다.", null));
        }

        if (!findUser.getImgUrl().equals(defaultImg)) {
            awsS3Service.delete(findUser.getImgUrl());
        }

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success", null));
    }
}