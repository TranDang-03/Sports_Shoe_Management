package com.example.demo.bean;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ChiTietSanPhamCreate {
    private List<com.example.demo.entity.SanPhamChiTiet> sanPhamChiTiets;
    private String userId;
}

