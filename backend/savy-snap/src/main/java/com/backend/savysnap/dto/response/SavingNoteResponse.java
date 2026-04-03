package com.backend.savysnap.dto.response;

import com.backend.savysnap.enums.PaymentCategory;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SavingNoteResponse {
    String id;
    String title;
    Long amount;
    PaymentCategory category;
    String description;
    String imageUrl;
    LocalDateTime createdAt;
}
