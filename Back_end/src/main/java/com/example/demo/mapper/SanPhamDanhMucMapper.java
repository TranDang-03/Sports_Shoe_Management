package com.example.demo.mapper;

import com.example.demo.dto.SanPhamDanhMucDto;
import com.example.demo.entity.SanPhamDanhMuc;

public class SanPhamDanhMucMapper {

    public SanPhamDanhMucDto mapToSanPhamDanhMucDto(SanPhamDanhMuc sanPhamDanhMuc) {
        SanPhamDanhMucDto sanPhamDanhMucDto = new SanPhamDanhMucDto(
                sanPhamDanhMuc.getId(),
                sanPhamDanhMuc.getSanPham(),
                sanPhamDanhMuc.getDanhMuc()
        );
        return sanPhamDanhMucDto;
    }

    public SanPhamDanhMuc mapToSanPhamDanhMuc(SanPhamDanhMucDto sanPhamDanhMucDto) {
        SanPhamDanhMuc sanPhamDanhMuc = new SanPhamDanhMuc(
                sanPhamDanhMucDto.getId(),
                sanPhamDanhMucDto.getSanPham(),
                sanPhamDanhMucDto.getDanhMuc()
        );
        return sanPhamDanhMuc;
    }

}
