package com.backend.savysnap.mapper;

import com.backend.savysnap.dto.request.SavingNoteCreateRequest;
import com.backend.savysnap.dto.request.SavingNoteUpdateRequest;
import com.backend.savysnap.dto.response.SavingNoteResponse;
import com.backend.savysnap.entity.SavingNote;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface SavingNoteMapper {
    SavingNote toSavingNote(SavingNoteCreateRequest savingNote);

    SavingNoteResponse toSavingNoteResponse(SavingNote savingNote);

    void updateSavingNote(@MappingTarget SavingNote savingNote, SavingNoteUpdateRequest request);

}
