package com.example.demo.repository;

import com.example.demo.entity.HoaDonChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface HoaDonChiTietRepository extends JpaRepository<HoaDonChiTiet, Long> {

    @Query("SELECT hdct from HoaDonChiTiet hdct where :idHD is null or hdct.hoaDon.id = :idHD")
    List<HoaDonChiTiet> getAll(String idHD);

    @Query("SELECT hd from HoaDonChiTiet hd where (:idHD is null or hd.hoaDon.id = :idHD) and hd.id = :idHDCT")
    List<HoaDonChiTiet> get(Long idHD, Long idHDCT);

    List<HoaDonChiTiet> findBySanPhamChiTiet_Id(Long id);
    List<HoaDonChiTiet> findAllByHoaDon_Id(Long idHD);

    @Query("SELECT hdct.sanPhamChiTiet.sanPham.id AS id, hdct.sanPhamChiTiet.sanPham.tenSanPham AS tenSanPham, SUM(hdct.soLuong) AS soLuongBanRa " +
            "FROM HoaDonChiTiet hdct " +
            "WHERE  hdct.hoaDon.trangThai = 5 " +
            "GROUP BY hdct.sanPhamChiTiet.sanPham.id " +
            "ORDER BY soLuongBanRa DESC")
    List<Object[]> findTop10SellingProducts();

    @Query("SELECT hdct.sanPhamChiTiet.sanPham.id AS id, hdct.sanPhamChiTiet.sanPham.tenSanPham AS tenSanPham, SUM(hdct.soLuong) AS soLuongBanRa " +
            "FROM HoaDonChiTiet hdct " +
            "WHERE  hdct.hoaDon.trangThai = 5 " +
            "GROUP BY hdct.sanPhamChiTiet.sanPham.id " +
            "ORDER BY soLuongBanRa ASC ")
    List<Object[]> findTop10NotSellingProducts();

    @Query("SELECT SUM(hdct.soLuong) " +
            "FROM HoaDonChiTiet hdct " +
            "WHERE hdct.hoaDon.trangThai = 5 ")
    Long getTotalQuantitySold();

    @Query("SELECT SUM(hdct.soLuong) " +
            "FROM HoaDonChiTiet hdct " +
            "WHERE hdct.hoaDon.trangThai = 6 ")
    Long getTotalQuantityCancel();

    @Query("SELECT SUM(hdct.soLuong) " +
            "FROM HoaDonChiTiet hdct " +
            "WHERE hdct.hoaDon.trangThai IN (0, 1, 2, 3, 4, 7) ")
    Long getTotalQuantityOther();

    @Query("SELECT hdct.hoaDon.trangThai AS trangThai, " +
            "SUM(hdct.soLuong) AS soLuongHoaDon " +
            "FROM HoaDonChiTiet hdct " +
            "GROUP BY hdct.hoaDon.trangThai"
    )
    List<Object[]> getQuantityByStatus();

//    @Query("SELECT COALESCE(SUM(hdct.soLuong), 0) FROM HoaDonChiTiet hdct " +
//            "WHERE hdct.sanPhamChiTiet.sanPham.id = :sanPhamId AND hdct.hoaDon.trangThai = 5")
//    Integer findTongSoLuongDaBan(@Param("sanPhamId") Long sanPhamId);

    @Query("SELECT COALESCE(SUM(hdct.soLuong), 0) AS soLuongDaBan, " +
            "COALESCE(SUM(hdct.giaSanPham * hdct.soLuong), 0) AS tongTienDaThuVe " +
            "FROM HoaDonChiTiet hdct " +
            "WHERE hdct.sanPhamChiTiet.sanPham.id = :sanPhamId AND hdct.hoaDon.trangThai = 5")
    Object[] findThongTinBanHang(@Param("sanPhamId") Long sanPhamId);

    @Query("SELECT sct.sanPhamChiTiet.mauSac , SUM(sct.soLuong) FROM HoaDonChiTiet sct " +
            "WHERE sct.sanPhamChiTiet.sanPham.id = :sanPhamId AND sct.hoaDon.trangThai = 5 " +
            "GROUP BY sct.sanPhamChiTiet.mauSac " +
            "ORDER BY SUM(sct.soLuong) DESC")
    Object[] findMauSacBanChayNhat(@Param("sanPhamId") Long sanPhamId);

    @Query("SELECT sct.sanPhamChiTiet.kichThuoc, SUM(sct.soLuong) FROM HoaDonChiTiet sct " +
            "WHERE sct.sanPhamChiTiet.sanPham.id = :sanPhamId AND sct.hoaDon.trangThai = 5 " +
            "GROUP BY sct.sanPhamChiTiet.kichThuoc " +
            "ORDER BY SUM(sct.soLuong) DESC")
    Object[] findKichThuocBanChayNhat(@Param("sanPhamId") Long sanPhamId);

    @Query("SELECT hdct.sanPhamChiTiet, SUM(hdct.soLuong) as soLuongBanRa " +
            "FROM HoaDonChiTiet hdct " +
            "WHERE hdct.sanPhamChiTiet.sanPham.id = :sanPhamId " +
            "AND hdct.hoaDon.trangThai = 5 " +
            "GROUP BY hdct.sanPhamChiTiet")
    List<Object[]> findxsa(@Param("sanPhamId") Long sanPhamId);

    HoaDonChiTiet findBySanPhamChiTiet_IdAndHoaDon_id(Long idSp, Long idHd);

    @Transactional
    @Modifying
    @Query("DELETE FROM HoaDonChiTiet h WHERE h.hoaDon.id = :hd")
    void deletex(@Param("hd") Long hd);
}
