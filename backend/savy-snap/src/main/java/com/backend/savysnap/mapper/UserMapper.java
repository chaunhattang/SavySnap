package com.backend.savysnap.mapper;

import com.backend.savysnap.dto.request.UserCreateRequest;
import com.backend.savysnap.dto.request.UserUpdateRequest;
import com.backend.savysnap.dto.response.UserResponse;
import com.backend.savysnap.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(UserCreateRequest request);

    UserResponse toUserResponse(User user);

    void updateUser(@MappingTarget User user, UserUpdateRequest request);
}
