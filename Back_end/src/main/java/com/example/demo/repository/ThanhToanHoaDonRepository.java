package com.example.demo.repository;

import com.example.demo.entity.ThanhToanHoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ThanhToanHoaDonRepository extends JpaRepository<ThanhToanHoaDon, Long> {
    @Query(value = "SELECT tthd.* FROM thanh_toan_hoa_don tthd JOIN hoa_don hd ON tthd.hoa_don_id = hd.id WHERE hd.id = :hoaDonId", nativeQuery = true)
    List<ThanhToanHoaDon> getAllByHoaDon(@Param("hoaDonId") Long hoaDonId);

    @Query(value = "SELECT tthd.* FROM thanh_toan_hoa_don tthd JOIN thanh_toan tt ON tthd.thanh_toan_id = tt.id WHERE tt.id = :thanhToanId", nativeQuery = true)
    List<ThanhToanHoaDon>getAllByThanhToan(@Param("thanhToanId") Long thanhToanId);
}
