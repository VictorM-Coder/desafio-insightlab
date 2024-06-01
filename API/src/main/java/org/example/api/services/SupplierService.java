package org.example.api.services;

import lombok.RequiredArgsConstructor;
import org.example.api.dtos.AddressRequest;
import org.example.api.dtos.SupplierRequest;
import org.example.api.models.Address;
import org.example.api.models.Supplier;
import org.example.api.repositories.SupplierRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SupplierService {
    private final SupplierRepository supplierRepository;
    public void save(SupplierRequest supplierRequest) {
        Supplier supplier = mapSupplierRequestToSupplierModel(supplierRequest);
        supplierRepository.save(supplier);
    }

    private static Supplier mapSupplierRequestToSupplierModel(SupplierRequest supplierRequest) {
        Supplier supplier = new Supplier();
        supplier.setName(supplierRequest.name());
        supplier.setCompanyName(supplierRequest.companyName());
        supplier.setCnpj(supplierRequest.cnpj());
        supplier.setEmail(supplierRequest.email());

        AddressRequest addressRequest = supplierRequest.address();
        Address address = new Address();
        address.setCity(addressRequest.city());
        address.setCep(addressRequest.cep());
        address.setAdditionalInfo(addressRequest.additionalInfo());
        address.setNeighborhood(addressRequest.neighborhood());
        address.setStreet(addressRequest.street());
        address.setNumber(addressRequest.number());
        address.setState(addressRequest.state());

        supplier.setAddress(address);
        return supplier;
    }
}
