package com.example.demo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class NotAuthorizedException extends RuntimeException{
    public String message;

    public NotAuthorizedException(String message) {
        super(message);
        this.message = message;
    }
}
