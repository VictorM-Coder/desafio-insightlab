package org.example.api.dtos.requests;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record SupplierRequest(
        @NotBlank String name,
        @NotBlank String companyName,
        @Pattern(regexp = "^\\d{2}.\\d{3}.\\d{3}/\\d{4}-\\d{2}$")
        String cnpj,
        @Email @NotBlank String email,
        @NotNull @Valid AddressRequest address
) {
}
