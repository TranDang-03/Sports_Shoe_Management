package com.example.demo.mapper;

import com.example.demo.dto.ThanhToanDto;
import com.example.demo.entity.ThanhToan;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface AutoThanhToanMapper {

    AutoThanhToanMapper MAPPER = Mappers.getMapper(AutoThanhToanMapper.class);

    ThanhToanDto mapToThanhToanDto(ThanhToan thanhToan);

    ThanhToan mapToThanhToan(ThanhToanDto thanhToanDto);
}
