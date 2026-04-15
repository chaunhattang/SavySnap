package com.backend.savysnap.configuration;

import com.backend.savysnap.entity.User;
import com.backend.savysnap.enums.RoleEnum;
import com.backend.savysnap.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ApplicationInitConfig implements ApplicationRunner {
    UserRepository userRepository;
    PasswordEncoder passwordEncoder;

    @Value("${app.admin.username}")
    String adminUsername;

    @Value("${app.admin.password}")
    String adminPassword;

    @Value("${app.admin.email}")
    String adminEmail;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        if (!userRepository.existsByUsername(adminUsername)) {
            User admin = User.builder()
                    .username(adminUsername)
                    .password(passwordEncoder.encode(adminPassword))
                    .email(adminEmail)
                    .role(RoleEnum.ADMIN)
                    .build();

            userRepository.save(admin);
            log.info("Admin account has been created");
        }
    }
}
