package com.backend.savysnap.controller;

import com.backend.savysnap.dto.request.UserUpdateRequest;
import com.backend.savysnap.dto.response.ApiResponse;
import com.backend.savysnap.dto.response.UserResponse;
import com.backend.savysnap.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {
    UserService userService;

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<List<UserResponse>> getAllUsers() {
        return ApiResponse.<List<UserResponse>>builder()
                .result(userService.getAllUsers())
                .message("All Users Got Successfully")
                .build();
    }

    @GetMapping("/my-info")
    public ApiResponse<UserResponse> getMyInfo() {
        return ApiResponse.<UserResponse>builder()
                .result(userService.getMyInfo())
                .message("My Information Got Successfully")
                .build();
    }

    @GetMapping(value = "/{username}")
    @PreAuthorize("hasRole('ADMIN') or #username == authentication.name")
    public ApiResponse<UserResponse> getUser(
            @PathVariable("username") String username) {
        return ApiResponse.<UserResponse>builder()
                .result(userService.getUserByUsername(username))
                .message("User Got Successfully")
                .build();
    }

    @PutMapping(value = "/{username}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ADMIN') or #username == authentication.name")
    public ApiResponse<UserResponse> updateUserByUsername(
            @PathVariable("username") String username,
            @ModelAttribute UserUpdateRequest request,
            @RequestParam(value = "file", required = false) MultipartFile file) {
        return ApiResponse.<UserResponse>builder()
                .result(userService.updateUserByUsername(username, request, file))
                .message("User Updated Successfully")
                .build();
    }

    @DeleteMapping(value = "/{username}")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<String> deleteUser(
            @PathVariable("username") String username) {
        return ApiResponse.<String>builder()
                .result(userService.deleteByUsername(username))
                .message("User Deleted Successfully")
                .build();
    }
}