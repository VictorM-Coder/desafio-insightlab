package org.example.api.services;

import jakarta.persistence.EntityNotFoundException;
import org.example.api.dtos.requests.SupplierRequest;
import org.example.api.dtos.responses.SupplierCompleteResponse;
import org.example.api.dtos.responses.SupplierResponse;
import org.example.api.dtos.responses.SuppliersPageResponse;
import org.example.api.mappers.SupplierMapper;
import org.example.api.models.SupplierModel;
import org.example.api.repositories.SupplierRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
                PageRequest.of(pageNumber, PAGE_SIZE, Sort.by(Sort.Direction.DESC,"createdAt"))
        );

        long totalPages = suppliers.getTotalElements();

        final var suppliersResponse = suppliers.get()
                .map(supplierMapper::modelToResponse)
                .toList();

        return new SuppliersPageResponse(suppliersResponse, pageNumber+1, totalPages, PAGE_SIZE);
    }

    public SupplierCompleteResponse findById(UUID id) {
        SupplierModel supplierModel = findByIdOrThrowsEntityNotFoundException(id);

        return supplierMapper.modelToCompleteResponse(supplierModel);
    }

    public void deleteById(UUID id) {
        findByIdOrThrowsEntityNotFoundException(id);
        supplierRepository.deleteById(id);
    }

    @Transactional
    public void update(UUID id, SupplierRequest supplierRequest) {
        findByIdOrThrowsEntityNotFoundException(id);
        final var supplierToBeUpdated =  supplierMapper.requestToModel(supplierRequest);
        
        supplierToBeUpdated.setId(id);
        supplierRepository.save(supplierToBeUpdated);
    }

    private SupplierModel findByIdOrThrowsEntityNotFoundException(UUID id) {
        return supplierRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Supplier not found"));
    }
}
