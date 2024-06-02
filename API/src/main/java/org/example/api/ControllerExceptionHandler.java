package org.example.api;

import jakarta.persistence.EntityNotFoundException;
import org.example.api.dtos.responses.ExceptionResponse;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.HandlerMethodValidationException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@ControllerAdvice
public class ControllerExceptionHandler {
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExceptionResponse> handleEntityNotFoundException(Exception exception) {
        final var response = ExceptionResponse.builder()
                .message("Internal Error: please contact the admin")
                .status(500)
                .timestamp(LocalDateTime.now())
                .errors(List.of())
                .build();

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(response);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ExceptionResponse> handleEntityNotFoundException(EntityNotFoundException exception) {

        final var response = ExceptionResponse.builder()
                .message(exception.getMessage())
                .status(HttpStatus.NOT_FOUND.value())
                .timestamp(LocalDateTime.now())
                .errors(List.of())
                .build();

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(response);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ExceptionResponse> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
        List<String> errors = ex.getBindingResult().getFieldErrors()
                .stream()
                .map(value -> value.getField() + " " + value.getDefaultMessage())
                .toList();

        return buildExceptionResponseForValidation(errors);
    }

    @ExceptionHandler(HandlerMethodValidationException.class)
    public ResponseEntity<ExceptionResponse> handleMethodArgumentNotValidException(HandlerMethodValidationException ex) {
        List<String> errors = ex.getAllErrors().stream()
                .map(messageSourceResolvable -> {
                    DefaultMessageSourceResolvable argument = (DefaultMessageSourceResolvable) Objects.requireNonNull(messageSourceResolvable.getArguments())[0];
                    return argument.getDefaultMessage() + " " + messageSourceResolvable.getDefaultMessage();
                }).toList();

        return buildExceptionResponseForValidation(errors);
    }

    private static ResponseEntity<ExceptionResponse> buildExceptionResponseForValidation(List<String> errors) {
        var exceptionDetails = ExceptionResponse.builder()
                .message("Invalid Arguments Exception")
                .timestamp(LocalDateTime.now())
                .errors(errors)
                .status(HttpStatus.BAD_REQUEST.value())
                .build();

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exceptionDetails);
    }
}
