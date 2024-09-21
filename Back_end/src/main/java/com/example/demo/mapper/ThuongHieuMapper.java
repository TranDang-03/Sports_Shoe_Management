package com.example.demo.mapper;

import com.example.demo.dto.ThuongHieuDto;
import com.example.demo.entity.ThuongHieu;

public class ThuongHieuMapper {
    public ThuongHieuDto mapToThuongHieuDto(ThuongHieu thuongHieu) {
        ThuongHieuDto thuongHieuDto = new ThuongHieuDto(
                thuongHieu.getId(),
                thuongHieu.getTen(),
                thuongHieu.getTrangThai()
        );
        return thuongHieuDto;
    }

    public ThuongHieu mapToThuongHieu(ThuongHieuDto thuongHieuDto) {
        ThuongHieu thuongHieu = new ThuongHieu(
                thuongHieuDto.getId(),
                thuongHieuDto.getTen(),
                thuongHieuDto.getTrangThai()
        );
        return thuongHieu;
    }
}
