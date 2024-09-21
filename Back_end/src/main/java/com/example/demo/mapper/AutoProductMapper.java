package com.example.demo.mapper;

import com.example.demo.entity.SanPham;
import com.example.demo.dto.SanPhamDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface AutoProductMapper {
    AutoProductMapper MAPPER = Mappers.getMapper(AutoProductMapper.class);

    SanPhamDto mapToSanPhamDto(SanPham sanPham);

    SanPham mapToSanPham(SanPhamDto sanPhamDto);

}
