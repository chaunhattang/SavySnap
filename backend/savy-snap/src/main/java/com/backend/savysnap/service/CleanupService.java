package com.backend.savysnap.service;

import com.backend.savysnap.repository.ForgotPasswordRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CleanupService {
    ForgotPasswordRepository forgotPasswordRepository;

    @Scheduled(cron = "0 10 * * * ?")
    public void cleanUpExpiredOtp() {
        log.info("Start clean up expired OTPs");
        forgotPasswordRepository.deleteByExpirationTimeBefore(new Date());
        log.info("Clean up expired OTPs");
    }
}
