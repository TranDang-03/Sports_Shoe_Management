package com.example.demo.repository;

import com.example.demo.entity.GioHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GioHangRepository extends JpaRepository<GioHang, Long> {
    List<GioHang> findByTaiKhoanUid(String uid);

    GioHang findByTaiKhoanUidAndSanPhamChiTietId(String uid, Long id);
    List<GioHang> findBySanPhamChiTietId( Long id);
}

