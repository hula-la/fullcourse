package com.ssafy.fullcourse.global.error;

public class ServerError extends RuntimeException{
    public ServerError() {
    }

    public ServerError(String message) {
        super(message);
    }

    public ServerError(String message, Throwable cause) {
        super(message, cause);
    }

    public ServerError(Throwable cause) {
        super(cause);
    }
}
