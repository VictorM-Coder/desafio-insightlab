package org.example.api.services;

import org.example.api.dtos.SupplierRequest;
import org.example.api.mappers.SupplierMapper;
import org.example.api.repositories.SupplierRepository;
import org.springframework.stereotype.Service;

@Service
public class SupplierService {
    private final SupplierRepository supplierRepository;
    private static final SupplierMapper supplierMapper = SupplierMapper.INSTANCE;

    public SupplierService(SupplierRepository supplierRepository) {
        this.supplierRepository = supplierRepository;
    }

    public void save(SupplierRequest supplierRequest) {
        final var supplier = supplierMapper.requestToModel(supplierRequest);
        supplierRepository.save(supplier);
    }
}
