package com.example.demo.repository;

import com.example.demo.entity.SanPhamDanhMuc;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SanPhamDanhMucRepository extends JpaRepository<SanPhamDanhMuc, Long> {

    @Modifying
    @Transactional
    @Query("DELETE FROM SanPhamDanhMuc sd WHERE sd.sanPham.id = :sanPhamId")
    void deleteBySanPhamId(@Param("sanPhamId") Long sanPhamId);

    @Query("SELECT sd FROM SanPhamDanhMuc sd WHERE sd.sanPham.id = :sanPhamId")
    List<SanPhamDanhMuc> findBySanPhamId(@Param("sanPhamId") Long sanPhamId);

}
