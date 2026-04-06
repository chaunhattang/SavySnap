package com.backend.savysnap.entity;

import com.backend.savysnap.enums.PaymentCategoryEnum;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SavingNote {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    String title;
    Long amount;
    @Enumerated(EnumType.STRING)
    PaymentCategoryEnum category;
    String description;
    String imageUrl;
    LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    User user;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
