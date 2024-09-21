package com.example.demo.mapper;

import com.example.demo.dto.DanhMucDto;
import com.example.demo.entity.DanhMuc;

public class DanhMucMapper {
    public DanhMucDto mapToDanhMucDto(DanhMuc danhMuc) {
        DanhMucDto danhMucDto = new DanhMucDto(
                danhMuc.getId(),
                danhMuc.getTen(),
                danhMuc.getTrangThai()
        );
        return danhMucDto;
    }

    public DanhMuc mapToDanhMuc(DanhMucDto danhMucDto) {
        DanhMuc danhMuc = new DanhMuc(
                danhMucDto.getId(),
                danhMucDto.getTen(),
                danhMucDto.getTrangThai()
        );
        return danhMuc;
    }
}
