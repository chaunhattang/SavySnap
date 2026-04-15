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
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
    CloudinaryService cloudinaryService;

    public SavingNoteResponse createSavingNote(SavingNoteCreateRequest request, MultipartFile file) {
        var context = SecurityContextHolder.getContext();
        String username = context.getAuthentication().getName();

        User user = userRepository.findByUsername(username).orElseThrow(()
                -> new AppException(ErrorCode.USER_NOT_FOUND)
        );

        SavingNote savingNote = savingNoteMapper.toSavingNote(request);
        savingNote.setUser(user);

        String imageUrl = cloudinaryService.uploadImage(file);
        if (imageUrl != null) {
            savingNote.setImageUrl(imageUrl);
        }

        long currentTotal = user.getTotalPayment() == null ? 0L : user.getTotalPayment();
        long addedAmount = request.getAmount() == null ? 0L : request.getAmount();

        user.setTotalPayment(currentTotal + addedAmount);
        userRepository.save(user);

        return savingNoteMapper.toSavingNoteResponse(savingNoteRepository.save(savingNote));
    }

    public List<SavingNoteResponse> getAllSavingNotes() {
        var context = SecurityContextHolder.getContext();
        var authentication = context.getAuthentication();
        String username = authentication.getName();

        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(role -> role.getAuthority().equals("SCOPE_ROLE_ADMIN"));

        if (isAdmin) {
            return savingNoteRepository.findAll().stream()
                    .map(savingNoteMapper::toSavingNoteResponse)
                    .collect(Collectors.toList());
        }

        return savingNoteRepository.findAllByUserUsername(username).stream()
                .map(savingNoteMapper::toSavingNoteResponse)
                .collect(Collectors.toList());
    }

    public SavingNoteResponse getSavingNoteById(String id) {
        SavingNote savingNote = savingNoteRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.SAVING_NOTE_NOT_FOUND));

        return savingNoteMapper.toSavingNoteResponse(savingNote);
    }

    public SavingNoteResponse updateSavingNote(
            String idSavingNote,
            SavingNoteUpdateRequest request,
            MultipartFile file
    ) {
        SavingNote savingNote = savingNoteRepository.findById(idSavingNote)
                .orElseThrow(() -> new AppException(ErrorCode.SAVING_NOTE_NOT_FOUND));

        User user = savingNote.getUser();
        long currentTotal = user.getTotalPayment() == null ? 0L : user.getTotalPayment();
        long oldAmount = savingNote.getAmount() == null ? 0L : savingNote.getAmount();
        long newAmount = request.getAmount() == null ? 0L : request.getAmount();

        user.setTotalPayment(currentTotal - oldAmount + newAmount);
        userRepository.save(user);

        savingNoteMapper.updateSavingNote(savingNote, request);

        String imageUrl = cloudinaryService.uploadImage(file);
        if (imageUrl != null) {
            savingNote.setImageUrl(imageUrl);
        }

        return savingNoteMapper.toSavingNoteResponse(savingNoteRepository.save(savingNote));
    }

    public String deleteSavingNote(String idSavingNote) {
        var savingNote = savingNoteRepository.findById(idSavingNote)
                .orElseThrow(() -> new AppException(ErrorCode.SAVING_NOTE_NOT_FOUND));

        User user = savingNote.getUser();
        long currentTotal = user.getTotalPayment() == null ? 0L : user.getTotalPayment();
        long oldAmount = savingNote.getAmount() == null ? 0L : savingNote.getAmount();

        user.setTotalPayment(currentTotal - oldAmount);
        userRepository.save(user);

        savingNoteRepository.deleteById(idSavingNote);
        return "Saving note deleted successfully by id" + idSavingNote;
    }
}
