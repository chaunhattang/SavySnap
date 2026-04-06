package com.backend.savysnap.dto.request;

import com.backend.savysnap.enums.PaymentCategory;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SavingNoteUpdateRequest {
    String title;
    Long amount;
    PaymentCategory category;
    String description;
    String imageUrl;
}
