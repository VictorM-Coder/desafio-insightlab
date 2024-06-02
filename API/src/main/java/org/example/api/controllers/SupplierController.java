package org.example.api.controllers;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.example.api.dtos.requests.SupplierRequest;
import org.example.api.dtos.responses.SupplierResponse;
import org.example.api.dtos.responses.SuppliersPageResponse;
import org.example.api.services.SupplierService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("suppliers")
public class SupplierController {
    private final SupplierService supplierService;

    public SupplierController(SupplierService supplierService) {
        this.supplierService = supplierService;
    }

    @PostMapping
    public ResponseEntity<SupplierResponse> post(@RequestBody @Valid SupplierRequest supplierRequest) {
        final var supplierResponse = supplierService.save(supplierRequest);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(supplierResponse);
    }

    @GetMapping()
    public ResponseEntity<SuppliersPageResponse> getAll(@RequestParam(name = "page", defaultValue = "1") int page) {
        final var pageResponse = supplierService.getAll(page-1);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(pageResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SupplierResponse> getById(@PathVariable @NotNull UUID id) {
        final var supplierResponse = supplierService.findById(id);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(supplierResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable @NotNull UUID id) {
        supplierService.deleteById(id);

        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> update(
            @PathVariable @NotNull UUID id,
            @RequestBody @Valid SupplierRequest supplierRequest
    ) {
        supplierService.update(id, supplierRequest);

        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }
}
