package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@ToString
@Table(name = "khuyen_mai")
public class KhuyenMai {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "ten", nullable = false)
    private String ten;

    @Column(name = "ma", nullable = false)
    private String ma;

    @Column(name = "mo_ta")
    private String moTa;

    @Column(name = "bat_dau", nullable = false)
    private LocalDate batDau;

    @Column(name = "ket_thuc", nullable = false)
    private LocalDate ketThuc;

    @Column(name = "giam_gia_tru_thang", nullable = false, precision = 20, scale = 2)
    private BigDecimal giamGiaTruThang;

    @Column(name = "giam_gia_phan_tram", nullable = false, precision = 20, scale = 2)
    private int giamGiaPhanTram;

}
