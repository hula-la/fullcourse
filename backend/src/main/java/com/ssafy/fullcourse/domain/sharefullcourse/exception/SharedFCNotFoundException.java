package com.ssafy.fullcourse.domain.sharefullcourse.exception;


public class SharedFCNotFoundException extends RuntimeException {
    public SharedFCNotFoundException() {
    }

    public SharedFCNotFoundException(String message) {
        super(message);
    }

    public SharedFCNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public SharedFCNotFoundException(Throwable cause) {
        super(cause);
    }
}
