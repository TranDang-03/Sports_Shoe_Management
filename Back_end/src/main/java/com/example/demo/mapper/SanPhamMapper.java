package com.example.demo.mapper;

import com.example.demo.entity.SanPham;
import com.example.demo.dto.SanPhamDto;

public class SanPhamMapper {

    //Chuyen SP Jpa sang Dto
    public SanPhamDto mapToSanPhamDto(SanPham sanPham) {
        SanPhamDto sanPhamDto = new SanPhamDto(
                sanPham.getId(),
                sanPham.getMaSanPham(),
                sanPham.getTenSanPham(),
                sanPham.getNgayTao(),
                sanPham.getTrangThai(),
                sanPham.getThuongHieu(),
                sanPham.getNgayCapNhat(),
                sanPham.getMoTa()
        );
        return sanPhamDto;
    }

    //Chuyen SP Dto sang Jpa
    public SanPham mapToSanPham(SanPhamDto sanPhamDto) {
        SanPham sanPham = new SanPham(
                sanPhamDto.getId(),
                sanPhamDto.getMaSanPham(),
                sanPhamDto.getNgayTao(),
                sanPhamDto.getTenSanPham(),
                sanPhamDto.getTrangThai(),
                sanPhamDto.getNgayCapNhat(),
                sanPhamDto.getThuongHieu(),
                sanPhamDto.getMoTa()
        );
        return sanPham;
    }

}
