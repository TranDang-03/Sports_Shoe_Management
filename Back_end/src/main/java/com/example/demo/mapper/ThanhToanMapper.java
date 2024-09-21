package com.example.demo.mapper;

import com.example.demo.dto.ThanhToanDto;
import com.example.demo.entity.ThanhToan;

public class ThanhToanMapper {
    public ThanhToanDto mapToThanhToanDto(ThanhToan thanhToan) {
        ThanhToanDto thanhToanDto = new ThanhToanDto(
                thanhToan.getId(),
                thanhToan.getTen()
        );
        return thanhToanDto;
    }

    public ThanhToan mapToThanhToan(ThanhToanDto thanhToanDto) {
        ThanhToan thanhToan = new ThanhToan(
                thanhToanDto.getId(),
                thanhToanDto.getTen()
        );
        return thanhToan;
    }

}
