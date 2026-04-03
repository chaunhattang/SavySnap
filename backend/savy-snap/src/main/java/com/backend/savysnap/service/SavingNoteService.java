package com.backend.savysnap.service;

import com.backend.savysnap.dto.request.SavingNoteCreateRequest;
import com.backend.savysnap.dto.request.SavingNoteUpdateRequest;
import com.backend.savysnap.dto.response.SavingNoteResponse;
import com.backend.savysnap.entity.SavingNote;
import com.backend.savysnap.entity.User;
import com.backend.savysnap.exception.AppException;
import com.backend.savysnap.exception.ErrorCode;
import com.backend.savysnap.mapper.SavingNoteMapper;
import com.backend.savysnap.repository.SavingNoteRepository;
import com.backend.savysnap.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SavingNoteService {
    UserRepository userRepository;
    SavingNoteRepository savingNoteRepository;
    SavingNoteMapper savingNoteMapper;

    public SavingNoteResponse createSavingNote(String username, SavingNoteCreateRequest request) {
        User user = userRepository.findByUsername(username).orElseThrow(()
                -> new AppException(ErrorCode.USER_NOT_FOUND)
        );

        SavingNote savingNote = savingNoteMapper.toSavingNote(request);
        savingNote.setUser(user);

        return savingNoteMapper.toSavingNoteResponse(savingNoteRepository.save(savingNote));
    }

    public List<SavingNoteResponse> getAllSavingNotes() {
        return savingNoteRepository.findAll().stream()
                .map(savingNoteMapper::toSavingNoteResponse)
                .collect(Collectors.toList());
    }

    public SavingNoteResponse getSavingNoteById(String id) {
        SavingNote savingNote = savingNoteRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.SAVING_NOTE_NOT_FOUND));

        return savingNoteMapper.toSavingNoteResponse(savingNote);
    }

    public SavingNoteResponse updateSavingNote(String idSavingNote, SavingNoteUpdateRequest request) {
        SavingNote savingNote = savingNoteRepository.findById(idSavingNote)
                .orElseThrow(() -> new AppException(ErrorCode.SAVING_NOTE_NOT_FOUND));

        savingNoteMapper.updateSavingNote(savingNote, request);

        return savingNoteMapper.toSavingNoteResponse(savingNoteRepository.save(savingNote));
    }

    public String deleteSavingNote(String id) {
        savingNoteRepository.deleteById(id);
        return "Saving note deleted successfully";
    }
}
