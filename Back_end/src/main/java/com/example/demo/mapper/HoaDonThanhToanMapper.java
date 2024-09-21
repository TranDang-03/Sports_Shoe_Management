package com.example.demo.mapper;

import com.example.demo.dto.HoaDonThanhToanDto;
import com.example.demo.entity.ThanhToanHoaDon;

public class HoaDonThanhToanMapper {

    public HoaDonThanhToanDto mapToHoaDonThanhToanDto(ThanhToanHoaDon thanhToanHoaDon) {
        HoaDonThanhToanDto hoaDonThanhToanDto = new HoaDonThanhToanDto(
                thanhToanHoaDon.getId(),
                thanhToanHoaDon.getHoaDon(),
                thanhToanHoaDon.getThanhToan(),
                thanhToanHoaDon.getSoTien()
        );
        return hoaDonThanhToanDto;
    }


    public ThanhToanHoaDon mapToHoaDonThanhToan(HoaDonThanhToanDto hoaDonThanhToanDto) {
        ThanhToanHoaDon thanhToanHoaDon = new ThanhToanHoaDon(
                hoaDonThanhToanDto.getId(),
                hoaDonThanhToanDto.getHoaDon(),
                hoaDonThanhToanDto.getThanhToan(),
                hoaDonThanhToanDto.getSoTien()
        );
        return thanhToanHoaDon;
    }
}
