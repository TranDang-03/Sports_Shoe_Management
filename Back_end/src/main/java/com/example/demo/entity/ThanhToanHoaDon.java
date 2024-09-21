package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "thanh_toan_hoa_don")
public class ThanhToanHoaDon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne()
    @JsonIgnore
    @JoinColumn(name = "hoa_don_id")
    private HoaDon hoaDon;

    @ManyToOne()
    @JoinColumn(name = "thanh_toan_id")
    private ThanhToan thanhToan;

    @Column(name = "so_tien", nullable = false, precision = 20, scale = 2)
    private BigDecimal soTien;

}
