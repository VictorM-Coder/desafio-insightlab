package org.example.api.dtos.responses;

import java.util.List;

public record SuppliersPageResponse(
        List<SupplierResponse> suppliers,
        int actualPage,
        long totalElements,
        int pageSize
) {
}
