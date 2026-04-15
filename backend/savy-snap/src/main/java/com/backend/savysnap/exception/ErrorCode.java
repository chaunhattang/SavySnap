package com.backend.savysnap.exception;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_KEY(8888, "Unrecognized message key", HttpStatus.BAD_REQUEST),

    USERNAME_INVALID(1001, "Username must be at least {min} characters", HttpStatus.BAD_REQUEST),
    PASSWORD_INVALID(1002, "Password must be at least {min} characters", HttpStatus.BAD_REQUEST),
    INVALID_DOB(1003, "Your age must be at least {min}", HttpStatus.BAD_REQUEST),

    USER_ALREADY_EXISTS(2001, "User already exists", HttpStatus.BAD_REQUEST),
    USER_NOT_FOUND(2002, "User not found", HttpStatus.NOT_FOUND),
    WRONG_PASSWORD(2003, "Wrong password", HttpStatus.FORBIDDEN),

    SAVING_NOTE_NOT_FOUND(2004, "Saving note not found", HttpStatus.NOT_FOUND),
    ERROR_UPLOAD_IMAGE(2005, "Error uploading image", HttpStatus.BAD_REQUEST),
    WRONG_OTP(2006, "Wrong OTP", HttpStatus.BAD_REQUEST),
    EXPIRED_OTP(2007, "OTP expired", HttpStatus.BAD_REQUEST),
    EXPIRED_PASSWORD(2008, "Password expired", HttpStatus.BAD_REQUEST),

    UNAUTHENTICATED(3001, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(3002, "You do not have permission", HttpStatus.FORBIDDEN),
    INVALID_TOKEN(3003, "Invalid or expired token", HttpStatus.UNAUTHORIZED),
    INVALID_REQUEST(3004, "Invalid request", HttpStatus.BAD_REQUEST),
    ;

    int code;
    String message;
    HttpStatusCode httpStatusCode;

    ErrorCode(int code, String message, HttpStatusCode httpStatusCode) {
        this.code = code;
        this.message = message;
        this.httpStatusCode = httpStatusCode;
    }
}