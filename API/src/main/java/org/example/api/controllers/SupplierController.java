package org.example.api.controllers;

import jakarta.validation.Valid;
import org.example.api.dtos.SupplierRequest;
import org.example.api.services.SupplierService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("suppliers")
public class SupplierController {
    private final SupplierService supplierService;

    public SupplierController(SupplierService supplierService) {
        this.supplierService = supplierService;
    }

    @PostMapping
    public ResponseEntity<Void> post(@RequestBody @Valid SupplierRequest supplierRequest) {
        supplierService.save(supplierRequest);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .build();
    }
}
