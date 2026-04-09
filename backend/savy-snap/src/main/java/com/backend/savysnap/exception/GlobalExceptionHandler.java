package com.backend.savysnap.exception;

import com.backend.savysnap.dto.response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(value = AppException.class)
    public ResponseEntity<ApiResponse<String>> handlingAppException(AppException exception) {

        ErrorCode errorCode = exception.getErrorCode();

        ApiResponse<String> apiResponse = ApiResponse.<String>builder()
                .code(errorCode.getCode())
                .message(errorCode.getMessage())
                .build();

        return ResponseEntity.badRequest().body(apiResponse);
    }
}
