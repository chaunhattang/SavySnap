package com.backend.savysnap.service;

import com.backend.savysnap.dto.request.AuthenticationRequest;
import com.backend.savysnap.dto.request.GoogleLoginRequest;
import com.backend.savysnap.dto.response.AuthenticationResponse;
import com.backend.savysnap.entity.User;
import com.backend.savysnap.enums.RoleEnum;
import com.backend.savysnap.exception.AppException;
import com.backend.savysnap.exception.ErrorCode;
import com.backend.savysnap.repository.UserRepository;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.Date;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationService {
    UserRepository userRepository;
    PasswordEncoder passwordEncoder;

    @NonFinal
    @Value("${jwt.signerKey}")
    protected String SIGNER_KEY;

    @NonFinal
    @Value("${jwt.valid-duration}")
    protected long VALID_DURATION;

    @NonFinal
    @Value("${google.client-id}")
    private String GOOGLE_CLIENT_ID;

    private User getUser(AuthenticationRequest request) {
        if (userRepository.existsByUsername(request.getAccountName())) {
            return userRepository.findByUsername(request.getAccountName()).orElse(null);
        }
        if (userRepository.existsByEmail(request.getAccountName())) {
            return userRepository.findByEmail(request.getAccountName()).orElse(null);
        }
        return null;
    }
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        User user = getUser(request);
        if (user == null) {
            throw new AppException(ErrorCode.USER_NOT_FOUND);
        }

        boolean passwordMatch = passwordEncoder.matches(request.getPassword(), user.getPassword());
        if (!passwordMatch) {
            throw new AppException(ErrorCode.WRONG_PASSWORD);
        }

        var token = generateToken(user);

        return AuthenticationResponse.builder()
                .token(token)
                .build();
    }

    private String generateToken(User user) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS256);

        String userRole = user.getRole().name();

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(user.getUsername())
                .issuer("savy-snap")
                .issueTime(new Date())
                .expirationTime(new Date(Instant.now().plus(VALID_DURATION, ChronoUnit.HOURS).toEpochMilli()))
                .claim("role", userRole)
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());

        JWSObject jwsObject = new JWSObject(header, payload);

        try {
            jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            log.error("Cannot create token", e);
            throw new RuntimeException(e);
        }
    }

    public AuthenticationResponse authenticateWithGoogle(GoogleLoginRequest request) {
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier
                    .Builder(new NetHttpTransport(), new GsonFactory())
                    .setAudience(Collections.singletonList(GOOGLE_CLIENT_ID))
                    .build();

            GoogleIdToken idToken = verifier.verify(request.getToken());
            if (idToken == null) {
                throw new AppException(ErrorCode.UNAUTHENTICATED);
            }

            GoogleIdToken.Payload payload = idToken.getPayload();
            String email = payload.getEmail();
            String name = (String) payload.get("name");
            String pictureUrl = (String) payload.get("picture");
            log.info("picture: " + pictureUrl);

            User user = userRepository.findByEmail(email).orElse(null);

            if (user == null) {
                user = User.builder()
                        .username(email)
                        .email(email)
                        .password(passwordEncoder.encode(java.util.UUID.randomUUID().toString()))
                        .avatarUrl(pictureUrl)
                        .role(RoleEnum.USER)
                        .build();
                user = userRepository.save(user);
            }

            var token = generateToken(user);
            return AuthenticationResponse.builder()
                    .token(token)
                    .build();

        } catch (Exception e) {
            log.error("Google login failed", e);
            log.error("Error{}", e.getMessage(), e);
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
    }
}
