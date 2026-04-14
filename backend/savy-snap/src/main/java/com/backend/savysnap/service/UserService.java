package com.backend.savysnap.service;

import com.backend.savysnap.dto.request.UserCreateRequest;
import com.backend.savysnap.dto.request.UserUpdateRequest;
import com.backend.savysnap.dto.response.UserResponse;
import com.backend.savysnap.entity.User;
import com.backend.savysnap.enums.RoleEnum;
import com.backend.savysnap.exception.AppException;
import com.backend.savysnap.exception.ErrorCode;
import com.backend.savysnap.mapper.UserMapper;
import com.backend.savysnap.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserService {
    UserRepository userRepository;
    UserMapper userMapper;
    CloudinaryService cloudinaryService;
    PasswordEncoder passwordEncoder;

    public UserResponse createUser(UserCreateRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new AppException(ErrorCode.USER_ALREADY_EXISTS);
        }
        User user = userMapper.toUser(request);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(RoleEnum.USER);

        return userMapper.toUserResponse(userRepository.save(user));
    }

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(userMapper::toUserResponse).collect(Collectors.toList());
    }

    public UserResponse getMyInfo() {
        var context = SecurityContextHolder.getContext();
        var authentication = context.getAuthentication();
        String username = authentication.getName();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        return userMapper.toUserResponse(user);
    }

    public UserResponse updateUserByUsername(String username, UserUpdateRequest request, MultipartFile file) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        userMapper.updateUser(user, request);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        String imageUrl = cloudinaryService.uploadImage(file);
        if (imageUrl != null) {
            user.setAvatarUrl(imageUrl);
        }

        return userMapper.toUserResponse(userRepository.save(user));
    }

    public UserResponse getUserByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        return userMapper.toUserResponse(user);
    }

    public String deleteByUsername(String username) {
        userRepository.deleteByUsername(username);
        return "Deleted by " + username;
    }
}
