package com.backend.savysnap.controller;

import com.backend.savysnap.dto.request.SavingNoteCreateRequest;
import com.backend.savysnap.dto.response.ApiResponse;
import com.backend.savysnap.dto.response.SavingNoteResponse;
import com.backend.savysnap.service.SavingNoteService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/notes")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SavingNoteController {
    SavingNoteService savingNoteService;

    @PostMapping("/{userID}")
    public ApiResponse<SavingNoteResponse> createSavingNote(@PathVariable String userId, @RequestBody SavingNoteCreateRequest request) {
        return ApiResponse.<SavingNoteResponse>builder()
                .result(savingNoteService.createSavingNote(userId, request))
                .build();
    }

    @GetMapping
    public ApiResponse<List<SavingNoteResponse>> getAllSavingNotes() {
        return ApiResponse.<List<SavingNoteResponse>>builder()
                .result(savingNoteService.getAllSavingNotes())
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<SavingNoteResponse> getSavingNote(@PathVariable String id) {
        return ApiResponse.<SavingNoteResponse>builder()
                .result(savingNoteService.getSavingNoteById(id))
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> deleteSavingNote(@PathVariable String id) {
        return ApiResponse.<String>builder()
                .result(savingNoteService.deleteSavingNote(id))
                .build();
    }
}
