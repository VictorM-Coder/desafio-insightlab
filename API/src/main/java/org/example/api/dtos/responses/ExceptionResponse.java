package org.example.api.dtos.responses;

import lombok.Builder;

import java.time.LocalDateTime;
import java.util.List;

@Builder
public record ExceptionResponse(
        String message,
        LocalDateTime timestamp,
        int status,
        List<String> errors
) {
}
