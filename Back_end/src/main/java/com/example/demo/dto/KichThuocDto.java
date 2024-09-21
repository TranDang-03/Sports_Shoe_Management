package com.example.demo.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Schema(description = "Size Dto model information")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class KichThuocDto {
    private Long id;
    @NotNull(message = "This 'giaTri' should not be null or empty")
    private BigDecimal giaTri;
    @NotEmpty(message = "This 'trangThai' should not be null or empty")
    private Boolean trangThai = false;
}