package com.example.demo.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Schema(description = "Brand Dto model information")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class DanhMucDto {

    @Schema(description = "Category id")
    private Long id;

    @Schema(description = "Category name")
    @NotEmpty(message = "Tên thương hiệu không được để trống")
    private String ten;

    @Schema(description = "Category status")
    @NotEmpty(message = "Tên thương hiệu không được để trống")
    private Boolean trangThai = false;
}
