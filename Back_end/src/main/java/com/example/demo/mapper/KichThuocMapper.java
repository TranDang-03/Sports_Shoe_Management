package com.example.demo.mapper;

import com.example.demo.entity.KichThuoc;
import com.example.demo.dto.KichThuocDto;

public class KichThuocMapper {

    public KichThuocDto mapToKichThuocDto(KichThuoc kichThuoc) {
        KichThuocDto kichThuocDto = new KichThuocDto(
                kichThuoc.getId(),
                kichThuoc.getGiaTri(),
                kichThuoc.getTrangThai()
        );
        return kichThuocDto;
    }


    public KichThuoc mapToKichThuoc(KichThuocDto kichThuocDto) {
        KichThuoc kichThuoc = new KichThuoc(
                kichThuocDto.getId(),
                kichThuocDto.getGiaTri(),
                kichThuocDto.getTrangThai()
        );
        return kichThuoc;
    }
}
