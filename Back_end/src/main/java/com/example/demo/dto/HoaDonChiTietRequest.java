package com.example.demo.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Schema(description = "Size Dto model information")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
@Setter
public class HoaDonChiTietRequest {
    private Long idSP;
    @NotNull(message = "This 'giaTri' should not be null or empty")
    private Integer soLuong;
    @NotEmpty(message = "This 'trangThai' should not be null or empty")
    private Long idHD;
}

