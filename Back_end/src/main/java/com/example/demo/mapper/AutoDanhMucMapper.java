package com.example.demo.mapper;

import com.example.demo.dto.DanhMucDto;
import com.example.demo.entity.DanhMuc;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface AutoDanhMucMapper {
    AutoDanhMucMapper MAPPER = Mappers.getMapper(AutoDanhMucMapper.class);

    DanhMucDto mapToDanhMucDto(DanhMuc danhMuc);

    DanhMuc mapToDanhMuc(DanhMucDto danhMucDto);
}
