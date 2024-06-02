package org.example.api.services;

import jakarta.persistence.EntityNotFoundException;
import org.example.api.dtos.requests.SupplierRequest;
import org.example.api.dtos.responses.SupplierResponse;
import org.example.api.dtos.responses.SuppliersPageResponse;
import org.example.api.mappers.SupplierMapper;
import org.example.api.models.SupplierModel;
import org.example.api.repositories.SupplierRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class SupplierService {
    private static final int PAGE_SIZE = 12;
    private final SupplierRepository supplierRepository;
    private static final SupplierMapper supplierMapper = SupplierMapper.INSTANCE;

    public SupplierService(SupplierRepository supplierRepository) {
        this.supplierRepository = supplierRepository;
    }

    public SupplierResponse save(SupplierRequest supplierRequest) {
        final var supplier = supplierMapper.requestToModel(supplierRequest);
        final var supplierSaved = supplierRepository.save(supplier);
        return supplierMapper.modelToResponse(supplierSaved);
    }

    public SuppliersPageResponse getAll(int pageNumber) {
        final Page<SupplierModel> suppliers = supplierRepository.findAll(
                PageRequest.of(pageNumber, PAGE_SIZE, Sort.by("name"))
        );

        int totalPages = suppliers.getTotalPages();

        final var suppliersResponse = suppliers.get()
                .map(supplierMapper::modelToResponse)
                .toList();

        return new SuppliersPageResponse(suppliersResponse, pageNumber+1, totalPages, PAGE_SIZE);
    }

    public SupplierResponse findById(UUID id) {
        SupplierModel supplierModel = supplierRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Supplier not found"));

        return supplierMapper.modelToResponse(supplierModel);
    }
}
