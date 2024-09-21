package com.example.demo.repository;

import com.example.demo.entity.HoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Repository
public interface HoaDonRepository extends JpaRepository<HoaDon, Long> {
    @Query("SELECT hd from HoaDon hd where :idKH is null or :idKH = '' or hd.taiKhoan.uid = :idKH order by hd.ngayCapNhat DESC ")
    public List<HoaDon> getAll(String idKH);

    public List<HoaDon> findAllByOrderByNgayTaoDesc();

    List<HoaDon> findByNgayTaoBetween(LocalDate startDate, LocalDate endDate);

    @Query("SELECT hoaDon.ngayTao AS ngayTao, COUNT(hoaDon) AS soLuongHoaDon " +
            "FROM HoaDon hoaDon " +
            "WHERE hoaDon.ngayTao BETWEEN :startDate AND :endDate " +
            "GROUP BY hoaDon.ngayTao")
    List<Map<String, Object>> findNgayTaoAndSoLuongHoaDonBetween(
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );

    @Query("SELECT hoaDon " +
            "FROM HoaDon hoaDon " +
            "WHERE DATE(hoaDon.ngayCapNhat) = CURRENT_DATE")
    List<HoaDon> findHoaDonNgayHienTai();

    @Query("SELECT DATE_FORMAT(d.ngayTao, '%Y-%m') as thang, COUNT(d) as soLuong FROM HoaDon d WHERE d.loaiHoaDon = true AND d.taiKhoan.uid = :uid AND d.ngayTao BETWEEN :startDate AND :endDate GROUP BY thang")
    List<Object[]> countDonHangTheoThang(@Param("uid") String uid, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);


    @Query("SELECT DATE_FORMAT(d.ngayTao, '%Y-%m') as thang, COUNT(d) as soLuong FROM HoaDon d WHERE d.loaiHoaDon = false AND d.taiKhoan.uid = :uid AND d.ngayTao BETWEEN :startDate AND :endDate GROUP BY thang")
    List<Object[]> countDonHangOfflineTheoThang(@Param("uid") String uid, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);


    @Query("SELECT hd FROM HoaDon hd WHERE hd.taiKhoan.uid = :taiKhoanId AND hd.loaiHoaDon = false AND hd.trangThai = 5")
    List<HoaDon> findOfflineHoaDonByTaiKhoanId(@Param("taiKhoanId") String taiKhoanId);


    List<HoaDon> findByLoaiHoaDonAndTrangThai(Boolean lhd, int tt);

    @Query("SELECT hd.taiKhoan AS taiKhoan, COUNT(hd) AS soLuongHoaDon " +
            "FROM HoaDon hd " +
            "WHERE hd.taiKhoan.chucVu = 2 " +
            "GROUP BY hd.taiKhoan" +
            " order by soLuongHoaDon DESC")
    List<Map<String, Object>> findTaiKhoanAndSoLuongHoaDon();
}