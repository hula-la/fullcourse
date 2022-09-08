package com.ssafy.fullcourse.domain.review.exception;

import org.springframework.data.crossstore.ChangeSetPersister;

public class ReviewNotFoundException extends RuntimeException {
    public ReviewNotFoundException() {
    }

    public ReviewNotFoundException(String message) {
        super(message);
    }

    public ReviewNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public ReviewNotFoundException(Throwable cause) {
        super(cause);
    }
}
