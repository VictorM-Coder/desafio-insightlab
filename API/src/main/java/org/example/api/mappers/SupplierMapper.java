package org.example.api.mappers;

import org.example.api.dtos.requests.SupplierRequest;
import org.example.api.dtos.responses.SupplierCompleteResponse;
import org.example.api.dtos.responses.SupplierResponse;
import org.example.api.models.AddressModel;
import org.example.api.models.SupplierModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

@Mapper
public interface SupplierMapper {
    SupplierMapper INSTANCE = Mappers.getMapper(SupplierMapper.class);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    SupplierModel requestToModel(SupplierRequest supplierRequest);

    @Mapping(target = "address", source = "address", qualifiedByName = "addressToString")
    SupplierResponse modelToResponse(SupplierModel supplierModel);

    SupplierCompleteResponse modelToCompleteResponse(SupplierModel supplierModel);

    @Named("addressToString")
    static String addressToString(AddressModel addressModel) {
        return addressModel.toString();
    }
}
