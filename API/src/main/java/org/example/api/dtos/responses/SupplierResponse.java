package org.example.api.dtos.responses;

import java.util.UUID;

public record SupplierResponse(
        UUID id,
        String name,
        String companyName,
        String cnpj,
        String email,
        String address
) {
}
