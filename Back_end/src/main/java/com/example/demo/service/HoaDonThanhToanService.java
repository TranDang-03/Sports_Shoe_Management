package com.example.demo.service;

import com.example.demo.dto.HoaDonThanhToanDto;

import java.util.List;

public interface HoaDonThanhToanService {
    HoaDonThanhToanDto createPaymentBill(HoaDonThanhToanDto hoaDonThanhToanDto);

    HoaDonThanhToanDto editPaymentBill(HoaDonThanhToanDto hoaDonThanhToanDto, Long id);

    void deletePaymentBill(Long id);

    List<HoaDonThanhToanDto> getAllByHoaDon(Long idHoaDon);

    List<HoaDonThanhToanDto> getAllByThanhToan(Long idThanhToan);
}
