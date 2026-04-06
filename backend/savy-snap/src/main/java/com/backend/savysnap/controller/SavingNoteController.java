package com.backend.savysnap.controller;

import com.backend.savysnap.dto.request.SavingNoteCreateRequest;
import com.backend.savysnap.dto.request.SavingNoteUpdateRequest;
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

    @PostMapping()
    public ApiResponse<SavingNoteResponse> createSavingNote(@RequestBody SavingNoteCreateRequest request) {
        return ApiResponse.<SavingNoteResponse>builder()
                .result(savingNoteService.createSavingNote(request))
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

    @PutMapping("/{id}")
    ApiResponse<SavingNoteResponse> update(@PathVariable String id, @RequestBody SavingNoteUpdateRequest request) {
        return ApiResponse.<SavingNoteResponse>builder()
                .result(savingNoteService.updateSavingNote(id, request))
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> deleteSavingNote(@PathVariable String id) {
        return ApiResponse.<String>builder()
                .result(savingNoteService.deleteSavingNote(id))
                .build();
    }
}
