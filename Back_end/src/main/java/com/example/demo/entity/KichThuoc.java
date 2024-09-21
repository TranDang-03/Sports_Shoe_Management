package com.example.demo.entity;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "kich_thuoc")
public class KichThuoc {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)

    private Long id;

    @Column(name = "gia_tri", nullable = false, precision = 3, scale = 1)
    private BigDecimal giaTri;

    @Column(name = "trang_thai", nullable = false)
    private Boolean trangThai = false;

}
