package org.example.api.dtos.responses;

public record AddressResponse(
    String street,
    int number,
    String additionalInfo,
    String neighborhood,
    String city,
    String state,
    String cep
) {
}
