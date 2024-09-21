package com.example.demo.repository;

import com.example.demo.entity.HoaDonKhuyenMai;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface HoaDonKhuyenMaiRepository extends JpaRepository<HoaDonKhuyenMai, Long> {
    HoaDonKhuyenMai findByHoaDon_Id(Long hoaDonId);


    @Query("SELECT hdkm.khuyenMai AS khuyenMai, COUNT(hdkm) AS soLuongHoaDon " +
            "FROM HoaDonKhuyenMai hdkm " +
            "GROUP BY hdkm.khuyenMai " +
            "ORDER BY soLuongHoaDon DESC")
    List<Map<String, Object>> findKhuyenMaiAndSoLuongHoaDon();
}
