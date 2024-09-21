package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@ToString
@Table(name = "hoa_don_chi_tiet")
public class HoaDonChiTiet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "ghi_chu")
    private String ghiChu;

    @Column(name = "so_luong")
    private Integer soLuong;

    @JsonIgnore
    @ManyToOne()
    @JoinColumn(name = "hoa_don_id")
    private HoaDon hoaDon;

    @Column(name = "gia_san_Pham")
    private BigDecimal giaSanPham;

    @ManyToOne()
    @JoinColumn(name = "san_pham_chi_tiet_id")
    private SanPhamChiTiet sanPhamChiTiet;

}
