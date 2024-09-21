package com.example.demo.service;

import com.example.demo.dto.ThuongHieuDto;

import java.util.List;

public interface ThuongHieuService {
    List<ThuongHieuDto> getAllThuongHieu();

    ThuongHieuDto createThuongHieu(ThuongHieuDto thuongHieuDto);

    ThuongHieuDto getById(Long id);

    ThuongHieuDto updateThuongHieu(ThuongHieuDto thuongHieuDto, Long id);

    List<ThuongHieuDto>findAllThuongHieuBySanPham(Long idSP);

    void deleteThuongHieu (Long id);

}
