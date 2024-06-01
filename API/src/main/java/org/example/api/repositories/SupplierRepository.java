package org.example.api.repositories;

import org.example.api.models.Supplier;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.UUID;

public interface SupplierRepository extends PagingAndSortingRepository<Supplier, UUID> {
}
