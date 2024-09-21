package com.example.demo.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

@Schema(description = "Payment Dto model information")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class ThanhToanDto {
    @Schema(description = "id")
    private Long id;

    @Schema(description = "name")
    @NotEmpty(message = "This name should not be null or empty")
    private String ten;


}
