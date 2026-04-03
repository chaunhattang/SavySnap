package com.backend.savysnap.repository;

import com.backend.savysnap.entity.SavingNote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SavingNoteRepository extends JpaRepository<SavingNote, String> {
}
