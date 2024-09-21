package com.example.demo.dto;

import com.example.demo.entity.HoaDon;
import com.example.demo.entity.ThanhToan;
import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

import java.math.BigDecimal;

@Schema(description = "Payment bill Dto model information")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class HoaDonThanhToanDto {
    @Schema(description = "id")
    private Long id;

    @Schema(description = "Hoa don")

    @NotEmpty(message = "This bill should not be null or empty")
    private HoaDon hoaDon;

    @Schema(description = "This payment should not be null or empty")
    private ThanhToan thanhToan;

    @Schema(description = "This cash amount should not be null or empty")
    private BigDecimal soTien;
}
