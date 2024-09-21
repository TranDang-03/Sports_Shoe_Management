package com.example.demo.service;

import com.example.demo.dto.MauSacDto;

import java.util.List;

public interface MauSacService {
    MauSacDto createColor(MauSacDto mauSacDto, String uid);
    MauSacDto getById(Long id);
    List<MauSacDto> getAllColors();
    List<MauSacDto> getAllAvailableColors();
    MauSacDto updateColor(MauSacDto updateMauSac, Long id, String uid);
    void deleteMauSac(Long id);
}
