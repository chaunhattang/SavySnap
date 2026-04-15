package com.backend.savysnap.dto.response;

import com.backend.savysnap.enums.RoleEnum;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {
    String id;
    String username;
    String email;
    String fullName;
    Long totalPayment;
    String avatarUrl;
    List<SavingNoteResponse> savingNotes;
    RoleEnum role;

}
