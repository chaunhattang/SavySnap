package com.backend.savysnap.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class VerifyOtpRequest {
    @NotBlank(message = "Email is not blank")
    String email;

    @NotNull(message = "Code OTP is not blank")
    Integer otp;
}
