package com.ssafy.fullcourse.domain.sharefullcourse.exception;

public class UserNotMatchException extends RuntimeException {
    public UserNotMatchException() {
    }

    public UserNotMatchException(String message) {
        super(message);
    }

    public UserNotMatchException(String message, Throwable cause) {
        super(message, cause);
    }

    public UserNotMatchException(Throwable cause) {
        super(cause);
    }
}
