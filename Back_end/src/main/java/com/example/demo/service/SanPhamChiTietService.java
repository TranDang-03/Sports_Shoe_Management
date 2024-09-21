package com.example.demo.service;

import com.example.demo.bean.ChiTietSanPhamCreate;
import com.example.demo.entity.MauSac;
import com.example.demo.entity.SanPham;
import com.example.demo.entity.SanPhamChiTiet;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface SanPhamChiTietService {

    Optional<SanPhamChiTiet> findById(Long aLong);

    boolean existsById(Long aLong);

    ResponseEntity<?> create(ChiTietSanPhamCreate chiTietSanPhamCreate);

    ResponseEntity<List<SanPhamChiTiet>> findBySanPhamIdAndTrangThai(Long idSP, Integer trangThai);

    ResponseEntity<?> findGiaBanMinMaxByIDSP(Long idSP);

    List<MauSac> findAllMSByIDSP(Long idSP);

    List<SanPham> findAllSPByIDMS(Long idMS);

    List<MauSac> findAllSPByIDKT(Long idMS);

    boolean updateSoLuongById(Long idSP, Integer soluong);

    ResponseEntity<List<SanPhamChiTiet>> findBySanPhamIdAndMauSacId(Long idSP, Long idMS);

    ResponseEntity<?> update(ChiTietSanPhamCreate chiTietSanPhamCreate);

    void removeById(Long id);

    ResponseEntity<List<SanPhamChiTiet>> getAll();
}
