package com.example.demo.mapper;

import com.example.demo.entity.KichThuoc;
import com.example.demo.dto.KichThuocDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface AutoSizeMapper {
    AutoSizeMapper MAPPER = Mappers.getMapper(AutoSizeMapper.class);
    KichThuocDto mapToKichThuocDto(KichThuoc kichThuoc);

    KichThuoc mapToKichThuoc(KichThuocDto kichThuocDto);
}
