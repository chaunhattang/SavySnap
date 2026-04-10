package com.backend.savysnap.service;

import com.backend.savysnap.exception.AppException;
import com.backend.savysnap.exception.ErrorCode;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CloudinaryService {
    Cloudinary cloudinary;

    public String uploadImage(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return null;
        }
        try {
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
            String originalUrl = uploadResult.get("secure_url").toString();

            return originalUrl.replace("/upload/", "/upload/f_auto,q_auto/");
        } catch (IOException e) {
            log.error("Lỗi khi upload ảnh lên Cloudinary", e);
            throw new AppException(ErrorCode.ERROR_UPLOAD_IMAGE);
        }
    }
}
