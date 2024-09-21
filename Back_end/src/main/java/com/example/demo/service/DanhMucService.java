package com.example.demo.service;

import com.example.demo.dto.DanhMucDto;

import java.util.List;

public interface DanhMucService {
    List<DanhMucDto> getAllDanhMuc();

    DanhMucDto createDanhMuc(DanhMucDto danhMucDto);

    DanhMucDto getById(Long id);

    DanhMucDto updateDanhMuc(DanhMucDto danhMucDto, Long id);

    void deleteDanhMuc (Long id);
}

