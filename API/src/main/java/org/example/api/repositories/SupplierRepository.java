package org.example.api.repositories;

import org.example.api.models.SupplierModel;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface SupplierRepository extends JpaRepository<SupplierModel, UUID> {
}
