package com.backend.savysnap.entity;

import com.backend.savysnap.enums.RoleEnum;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    @Column(nullable = false, unique = true)
    String username;
    @Column(nullable = false)
    String password;
    @Column(nullable = false, unique = true)
    String email;

    @Column(nullable = true)
    String fullName;

    @Builder.Default
    Long totalPayment = 0L;

    @Column(columnDefinition = "TEXT")
    String avatarUrl;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    List<SavingNote> savingNotes;

    RoleEnum role;
}
