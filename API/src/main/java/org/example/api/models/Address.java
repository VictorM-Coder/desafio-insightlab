package org.example.api.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

import java.util.UUID;

@Data
@Entity
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotBlank
    private String street;

    @NotNull
    private int number;

    private String additionalInfo;

    @NotBlank
    private String neighborhood;

    @NotBlank
    private String city;

    @NotBlank
    @Pattern(regexp = "(^\\d{5})-?(\\d{3}$)")
    private String cep;
}
