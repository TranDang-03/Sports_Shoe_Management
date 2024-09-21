package com.example.demo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class AttributeNotValidException extends RuntimeException {
    private String resouceName;
    private String fieldName;
    private Long fieldValue;

    public AttributeNotValidException(String resouceName, String fieldName, Long fieldValue) {
        super(String.format("%s not valid with %s : '%s'", resouceName, fieldName, fieldValue));
        this.resouceName = resouceName;
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;

    }
}

