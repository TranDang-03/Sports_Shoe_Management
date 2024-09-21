package com.example.demo.mapper;

import com.example.demo.dto.SanPhamDanhMucDto;
import com.example.demo.entity.SanPhamDanhMuc;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface AutoSanPhamDanhMucMapper {
    AutoSanPhamDanhMucMapper MAPPER = Mappers.getMapper(AutoSanPhamDanhMucMapper.class);

    SanPhamDanhMucDto mapToSanPhamDanhMucDto(SanPhamDanhMuc sanPhamDanhMuc);

    SanPhamDanhMuc mapToSanPhamDanhMuc(SanPhamDanhMucDto sanPhamDanhMucDto);
}
