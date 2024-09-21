package com.example.demo.service;

import com.example.demo.dto.ThanhToanDto;

import java.util.List;

public interface ThanhToanService {
    ThanhToanDto createPayment(ThanhToanDto thanhToanDto);

    List<ThanhToanDto>getAllThanhToan();
    ThanhToanDto getById(Long id);
}
