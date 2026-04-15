package com.backend.savysnap.controller;

import com.backend.savysnap.dto.request.ForgotPasswordRequest;
import com.backend.savysnap.dto.request.UpdatePasswordRequest;
import com.backend.savysnap.dto.request.VerifyOtpRequest;
import com.backend.savysnap.dto.response.ApiResponse;
import com.backend.savysnap.service.ForgotPasswordService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ForgotPasswordController {
    ForgotPasswordService forgotPasswordService;

    @PostMapping("/forgot-password")
    public ApiResponse<String> requestOtp(@RequestBody @Valid ForgotPasswordRequest request) {
        forgotPasswordService.sendOtp(request.getEmail());
        return ApiResponse.<String>builder()
                .message("Send PIN to your email")
                .build();
    }

    @PostMapping("/verify-otp")
    public ApiResponse<String> verifyOtp(@RequestBody @Valid VerifyOtpRequest request) {
        return ApiResponse.<String>builder()
                .message("Verified Successfully")
                .result(forgotPasswordService.verifyOtp(request))
                .build();
    }

    @PostMapping("/change-password")
    public ApiResponse<String> changePassword(@RequestBody @Valid UpdatePasswordRequest request) {
        forgotPasswordService.changePassword(request);
        return ApiResponse.<String>builder()
                .message("Changed Password Successfully")
                .build();
    }
}
