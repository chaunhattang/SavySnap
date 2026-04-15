package com.backend.savysnap.service;

import com.backend.savysnap.dto.request.UpdatePasswordRequest;
import com.backend.savysnap.dto.request.VerifyOtpRequest;
import com.backend.savysnap.entity.ForgotPassword;
import com.backend.savysnap.entity.User;
import com.backend.savysnap.exception.AppException;
import com.backend.savysnap.exception.ErrorCode;
import com.backend.savysnap.repository.ForgotPasswordRepository;
import com.backend.savysnap.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Random;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ForgotPasswordService {
    UserRepository userRepository;
    ForgotPasswordRepository forgotPasswordRepository;
    JavaMailSender javaMailSender;
    private final PasswordEncoder passwordEncoder;

    public void sendOtp(String email) {
        log.info("Sending OTP for email {}", email);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        int otp = new Random().nextInt(900_000) + 100_000;

        ForgotPassword forgotPassword = ForgotPassword.builder()
                .otp(otp)
                .expirationTime(new Date(System.currentTimeMillis() + 5 * 60 * 1000))
                .user(user)
                .build();

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Password Change Verification Code - SavySnap");
        message.setText("Your PIN is: " + otp);
        javaMailSender.send(message);

        forgotPasswordRepository.save(forgotPassword);
    }

    public String verifyOtp(VerifyOtpRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        ForgotPassword forgotPassword = forgotPasswordRepository.findByOtpAndUser(request.getOtp(), user)
                .orElseThrow(() -> new AppException(ErrorCode.WRONG_OTP));

        if (forgotPassword.getExpirationTime().before(new Date())) {
            forgotPasswordRepository.delete(forgotPassword);
            throw new AppException(ErrorCode.EXPIRED_OTP);
        }

        String resetToken = java.util.UUID.randomUUID().toString();
        forgotPassword.setOtp(null);
        forgotPassword.setResetToken(resetToken);
        forgotPassword.setExpirationTime(new Date(System.currentTimeMillis() + 5 * 60 * 1000));

        forgotPasswordRepository.save(forgotPassword);
        return resetToken;
    }

    public void changePassword(UpdatePasswordRequest request) {
        ForgotPassword forgotPassword = forgotPasswordRepository.findByResetToken(request.getResetToken())
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_REQUEST));

        if (forgotPassword.getExpirationTime().before(new Date())) {
            forgotPasswordRepository.delete(forgotPassword);
            throw new AppException(ErrorCode.EXPIRED_PASSWORD);
        }

        User user = forgotPassword.getUser();
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        userRepository.save(user);
        forgotPasswordRepository.delete(forgotPassword);
    }
}
