package com.example.demo.entity;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "mau_sac")
public class MauSac {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)

    private Long id;

    @Column(name = "gia_tri", nullable = false, length = 50)
    private String giaTri;

    @Column(name = "ten", nullable = false)
    private String ten;

    @Column(name = "trang_thai", nullable = false)
    private Boolean trangThai = false;

}
