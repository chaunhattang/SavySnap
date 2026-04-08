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
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/notes")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SavingNoteController {
    SavingNoteService savingNoteService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<SavingNoteResponse> createSavingNote(
            @ModelAttribute SavingNoteCreateRequest request,
            @RequestParam(value = "file", required = false) MultipartFile file
    ) {
        return ApiResponse.<SavingNoteResponse>builder()
                .result(savingNoteService.createSavingNote(request, file))
                .build();
    }

    @GetMapping
    public ApiResponse<List<SavingNoteResponse>> getAllSavingNotes() {
        return ApiResponse.<List<SavingNoteResponse>>builder()
                .result(savingNoteService.getAllSavingNotes())
                .build();
    }

    @GetMapping(value = "/{id}")
    public ApiResponse<SavingNoteResponse> getSavingNote(
            @PathVariable("id") String id
    ) {
        return ApiResponse.<SavingNoteResponse>builder()
                .result(savingNoteService.getSavingNoteById(id))
                .build();
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    ApiResponse<SavingNoteResponse> update(
            @PathVariable("id") String id,
            @ModelAttribute SavingNoteUpdateRequest request,
            @RequestParam(value = "file", required = false) MultipartFile file
    ) {
        return ApiResponse.<SavingNoteResponse>builder()
                .result(savingNoteService.updateSavingNote(id, request, file))
                .build();
    }

    @DeleteMapping(value = "/{id}")
    public ApiResponse<String> deleteSavingNote(
            @PathVariable("id") String id
    ) {
        return ApiResponse.<String>builder()
                .result(savingNoteService.deleteSavingNote(id))
                .build();
    }
}
