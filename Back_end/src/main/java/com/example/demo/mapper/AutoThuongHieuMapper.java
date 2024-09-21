package com.example.demo.mapper;

import com.example.demo.dto.ThuongHieuDto;
import com.example.demo.entity.ThuongHieu;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface AutoThuongHieuMapper {
    AutoThuongHieuMapper MAPPER = Mappers.getMapper(AutoThuongHieuMapper.class);

    ThuongHieuDto mapToThuongHieuDto(ThuongHieu thuongHieu);

    ThuongHieu mapToThuongHieu(ThuongHieuDto thuongHieuDto);
}
