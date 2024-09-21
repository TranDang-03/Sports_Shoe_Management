package com.example.demo.service;

import com.example.demo.dto.SanPhamDto;
import com.example.demo.entity.SanPham;

import java.math.BigDecimal;
import java.util.List;

public interface SanPhamService {

    List<SanPham> getAvailableProductsByParams(String name, List<Long> categories, List<Long> brands, List<Long> colors, List<Long> sizes, BigDecimal minPrice, BigDecimal maxPrice) ;
    SanPhamDto createProduct(SanPhamDto sanPhamDto, String uid);

    SanPhamDto getById(Long id);

    List<SanPhamDto> getAllProducts();

    List<SanPhamDto> getAllAvailableProducts();

    List<SanPhamDto> getAllDeletedProducts();

    List<SanPhamDto> getAvailableBrandedProducts(Long idThuongHieu);

    List<SanPhamDto> getAllBrandedProducts(Long idThuongHieu);

    SanPhamDto updateProduct(SanPhamDto updateSanPham, Long id, String uid);

    void deleteSanPham(Long id, String uid);
}
