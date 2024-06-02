package org.example.api.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

import java.util.UUID;

@Data
@Entity
@Table(name = "address_tb")
public class AddressModel {
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
    private String state;

    @NotBlank
    @Pattern(regexp = "(^\\d{5})-?(\\d{3}$)")
    private String cep;

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(street).append(", ").append(number);

        if (additionalInfo != null && !additionalInfo.isEmpty()) {
            sb.append(", ").append(additionalInfo);
        }

        sb.append(", ").append(neighborhood)
                .append(", ").append(city)
                .append(", ").append(state)
                .append(", ").append(cep);

        return sb.toString();
    }
}
