package com.example.demo.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Schema(description = "Color Dto model information")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MauSacDto {
    private Long id;
    @NotEmpty(message = "This 'giaTri' should not be null or empty")
    private String giaTri;
    @NotEmpty(message = "This 'ten' should not be null or empty")
    private String ten;
    @NotEmpty(message = "This 'trangThai' should not be null or empty")
    private Boolean trangThai = false;
}
