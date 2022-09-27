package com.ssafy.fullcourse.domain.fullcourse.exception;

public class FullCourseDiaryNotFoundException extends RuntimeException {
    public FullCourseDiaryNotFoundException() {
    }

    public FullCourseDiaryNotFoundException(String message) {
        super(message);
    }

    public FullCourseDiaryNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public FullCourseDiaryNotFoundException(Throwable cause) {
        super(cause);
    }

}
