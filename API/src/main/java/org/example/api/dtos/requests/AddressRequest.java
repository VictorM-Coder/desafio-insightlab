package org.example.api.dtos.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record AddressRequest(
        @NotBlank String street,

        @NotNull int number,

        String additionalInfo,

        @NotBlank String neighborhood,

        @NotBlank String city,

        @NotBlank String state,

        @NotBlank
        @Pattern(regexp = "(^\\d{5})-?(\\d{3}$)")
        String cep
) {
}
