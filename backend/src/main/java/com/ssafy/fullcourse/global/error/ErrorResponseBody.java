package com.ssafy.fullcourse.global.error;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;


@Getter
@Builder
@RequiredArgsConstructor
public class ErrorResponseBody extends RuntimeException {
    private final Integer statusCode;
    private final String message;

    public static ErrorResponseBody of(Integer statusCode, String message){
        return ErrorResponseBody.builder()
                .statusCode(statusCode)
                .message(message)
                .build();
    }

}
