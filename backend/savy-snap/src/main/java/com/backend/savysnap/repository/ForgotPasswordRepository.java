package com.backend.savysnap.repository;

import com.backend.savysnap.entity.ForgotPassword;
import com.backend.savysnap.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.Optional;

public interface ForgotPasswordRepository extends JpaRepository<ForgotPassword, String> {
    Optional<ForgotPassword> findByOtpAndUser(Integer otp, User user);

    Optional<ForgotPassword> findByResetToken(String resetToken);

    @Transactional
    void deleteByExpirationTimeBefore(Date currentTime);
}
