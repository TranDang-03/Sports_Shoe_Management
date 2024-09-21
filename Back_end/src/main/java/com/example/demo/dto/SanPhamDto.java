package com.example.demo.dto;

import com.example.demo.entity.ThuongHieu;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

import java.time.Instant;
import java.time.LocalDate;

@Schema(description = "Product Dto model information")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class SanPhamDto {

    @Schema(description = "Product id")
    private Long id;
    @Schema(description = "Product name")
    @NotEmpty(message = "This product name should not be null or empty")
    private String tenSanPham;
    @NotEmpty(message = "This product code should not be null or empty")
    private String maSanPham;
    @Schema(description = "Product created date")
    @NotEmpty(message = "This product created date should not be null or empty")
    private LocalDate ngayTao;
    @Schema(description = "Product status")
    @NotEmpty(message = "This product status should not be null or empty")
    private Integer trangThai;
    @Schema(description = "Product branch")
    @NotEmpty(message = "This product branch should not be null or empty")
    private ThuongHieu thuongHieu;
    @Schema(description = "Product update date")
    private Instant ngayCapNhat;
    @Schema(description = "Product description")
    private String moTa;

}
