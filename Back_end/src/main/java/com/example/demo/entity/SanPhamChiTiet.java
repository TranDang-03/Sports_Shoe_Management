package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.time.Instant;

@Getter
@Setter
@Entity
@ToString
@Table(name = "san_pham_chi_tiet")
public class SanPhamChiTiet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "so_luong", nullable = false)
    private Integer soLuong;

    @Column(name = "trang_thai", nullable = false)
    private Integer trangThai;

    @ManyToOne
    @JoinColumn(name = "mau_sac_id")
    private MauSac mauSac;

    @ManyToOne
    @JoinColumn(name = "san_pham_id")
    private SanPham sanPham;

    @ManyToOne
    @JoinColumn(name = "kich_thuoc_id")
    private KichThuoc kichThuoc;

    @Column(name = "gia_nhap", nullable = false, precision = 20, scale = 2)
    private BigDecimal giaNhap;

    @Column(name = "gia_ban", nullable = false, precision = 20, scale = 2)
    private BigDecimal giaBan;

    @Column(name = "ngay_cap_nhat")
    private Instant ngayCapNhat;

    @PrePersist
    void prePersist(){
        this.ngayCapNhat = Instant.now();
    }

    @PreUpdate
    void preUpdate(){
        this.ngayCapNhat = Instant.now();
    }

}
