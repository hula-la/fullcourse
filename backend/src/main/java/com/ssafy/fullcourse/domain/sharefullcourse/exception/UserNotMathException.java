package com.ssafy.fullcourse.domain.sharefullcourse.exception;

public class UserNotMathException extends RuntimeException {
    public UserNotMathException() {
    }

    public UserNotMathException(String message) {
        super(message);
    }

    public UserNotMathException(String message, Throwable cause) {
        super(message, cause);
    }

    public UserNotMathException(Throwable cause) {
        super(cause);
    }
}
