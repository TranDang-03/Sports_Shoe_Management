package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "hoa_don_khuyen_mai")
public class HoaDonKhuyenMai {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne()

    @JoinColumn(name = "hoa_don_id")
    private HoaDon hoaDon;

    @ManyToOne()
    @JoinColumn(name = "khuyen_mai_id")
    private KhuyenMai khuyenMai;

}
