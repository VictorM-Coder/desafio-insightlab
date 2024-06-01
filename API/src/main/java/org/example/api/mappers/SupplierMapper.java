package org.example.api.mappers;

import org.example.api.dtos.SupplierRequest;
import org.example.api.models.SupplierModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface SupplierMapper {
    SupplierMapper INSTANCE = Mappers.getMapper(SupplierMapper.class);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    SupplierModel requestToModel(SupplierRequest supplierRequest);
}
