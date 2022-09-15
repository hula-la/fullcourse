package com.ssafy.fullcourse.domain.fullcourse.exception;

public class FullCourseNotFoundException extends RuntimeException {
    public FullCourseNotFoundException() {
    }

    public FullCourseNotFoundException(String message) {
        super(message);
    }

    public FullCourseNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public FullCourseNotFoundException(Throwable cause) {
        super(cause);
    }
}
