package com.example.demo.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Entity
@ToString
@Table(name = "hoa_don")
public class HoaDon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @CreationTimestamp
    @Column(name = "ngay_tao")
    private LocalDate ngayTao;

    @Column(name = "ghi_chu")
    private String ghiChu;

    @Column(name = "ten_nguoi_nhan")
    private String tenNguoiNhan;

    @Column(name = "ngay_cap_nhat")
    private Instant ngayCapNhat;

    @Column(name = "trang_thai" )
    private Integer trangThai;

    @Column(name = "loai_hoa_don")
    private Boolean loaiHoaDon = false;

    @NotBlank
    @Lob
    @Column(name = "dia_chi_cu_the")
    private String diaChiCuThe;

    @Column(name = "phi_van_chuyen", precision = 20, scale = 2)
    private BigDecimal phiVanChuyen;

    @NotBlank
    @Pattern(regexp = "^0[0-9]{9}$")
    @Column(name = "sdt_nhan_hang", length = 15)
    private String sdtNhanHang;


    @ManyToOne()
    @JoinColumn(name = "tai_khoan_id")
    private TaiKhoan taiKhoan;

    @OneToMany(mappedBy = "hoaDon", cascade = CascadeType.ALL)
    private List<HoaDonChiTiet> chiTietHoaDonList;
}
