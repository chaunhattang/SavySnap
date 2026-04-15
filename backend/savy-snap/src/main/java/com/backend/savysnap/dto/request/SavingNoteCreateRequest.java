package com.backend.savysnap.dto.request;

import com.backend.savysnap.enums.PaymentCategoryEnum;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SavingNoteCreateRequest {
    String title;
    Long amount;
    PaymentCategoryEnum category;
    String description;
}
