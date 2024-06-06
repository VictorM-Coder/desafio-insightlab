package org.example.api.dtos.responses;

import java.util.UUID;

public record SupplierCompleteResponse(
        UUID id,
        String name,
        String companyName,
        String cnpj,
        String email,
        AddressResponse address
) {
}
