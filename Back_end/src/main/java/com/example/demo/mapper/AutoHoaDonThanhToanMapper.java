package com.example.demo.mapper;

import com.example.demo.dto.HoaDonThanhToanDto;
import com.example.demo.entity.ThanhToanHoaDon;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface AutoHoaDonThanhToanMapper {
    AutoHoaDonThanhToanMapper MAPPER = Mappers.getMapper(AutoHoaDonThanhToanMapper.class);

    HoaDonThanhToanDto mapToHoaDonThanhToanDto(ThanhToanHoaDon thanhToanHoaDon);

    ThanhToanHoaDon mapToHoaDonThanhToan(HoaDonThanhToanDto hoaDonThanhToanDto);
}
