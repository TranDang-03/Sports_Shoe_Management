package com.example.demo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {
    private String resouceName;
    private String fieldName;
    private Long fieldValue;
    private String fieldValue2;

    public ResourceNotFoundException(String resouceName, String fieldName, Long fieldValue) {
        super(String.format("%s not found with %s : '%s'", resouceName, fieldName, fieldValue));
        this.resouceName = resouceName;
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;

    }

    public ResourceNotFoundException(String resouceName, String fieldName, String fieldValue2) {
        super(String.format("%s not found with %s : '%s'", resouceName, fieldName, fieldValue2));
        this.resouceName = resouceName;
        this.fieldName = fieldName;
        this.fieldValue2 = fieldValue2;

    }
}
