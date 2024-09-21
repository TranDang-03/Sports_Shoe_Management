package com.example.demo.mapper;

import com.example.demo.entity.MauSac;
import com.example.demo.dto.MauSacDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface AutoColorsMapper {
    AutoColorsMapper MAPPER = Mappers.getMapper(AutoColorsMapper.class);

    MauSacDto mapToMauSacDto(MauSac mauSac);

    MauSac mapToMauSac(MauSacDto mauSacDto);
}
