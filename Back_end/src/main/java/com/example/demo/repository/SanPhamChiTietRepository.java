package com.example.demo.repository;

import com.example.demo.entity.MauSac;
import com.example.demo.entity.SanPham;
import com.example.demo.entity.SanPhamChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface SanPhamChiTietRepository extends JpaRepository<SanPhamChiTiet, Long> {
    public boolean existsByMauSacIdAndSanPhamIdAndKichThuocId(Long mauSacId, Long sanPhamId, Long kichThuocId);

    public List<SanPhamChiTiet> findBySanPhamIdAndTrangThai(Long idSP, Integer trangThai);

    public List<SanPhamChiTiet> findBySanPhamIdAndMauSacId(Long idSP, Long idMS);

    @Query(value = "SELECT max(spct.giaBan) from SanPhamChiTiet spct where spct.sanPham.id=:idSP")
    public Double findGiaBanMaxByIDSP(@Param("idSP") Long idSP);

    @Query(value = "SELECT min(spct.giaBan) from SanPhamChiTiet spct where spct.sanPham.id=:idSP")
    public Double findGiaBanMinByIDSP(@Param("idSP") Long idSP);

    @Modifying
    @Transactional
    @Query(value = "UPDATE san_pham_chi_tiet\n" +
            "SET so_luong = :soluong+so_luong " +
            "WHERE id = :id", nativeQuery = true)
    public Integer updateSoLuongById(@Param("id") Long idSP, @Param("soluong") Integer soluong);

    @Modifying
    @Transactional
    @Query(value = "UPDATE san_pham_chi_tiet\n" +
            "SET so_luong = :soluong " +
            "WHERE id = :id", nativeQuery = true)
    public Integer updateSoLuong2ById(@Param("id") Long idSP, @Param("soluong") Integer soluong);


    @Query("SELECT ms FROM SanPhamChiTiet spct JOIN MauSac ms ON spct.mauSac.id = ms.id WHERE spct.sanPham.id = :idSP")
    public List<MauSac> findAllMSByIDSP(@Param("idSP") Long idSP);

    @Query(value = "SELECT sp from SanPhamChiTiet spct join SanPham sp where spct.mauSac.id=:idMS")
    public List<SanPham> findAllSPByIDMS(@Param("idMS") Long idMS);

    @Query(value = "SELECT sp from SanPhamChiTiet spct join SanPham sp where spct.kichThuoc.id=:idSP")
    public List<MauSac> findAllSPByIDKT(@Param("idSP") Long idSP);

    //Lấy giá bán cao nhất
    SanPhamChiTiet findTopByOrderByGiaBanDesc();

    //hoàn trả số số lượng
    @Modifying
    @Transactional
    @Query("UPDATE SanPhamChiTiet spct SET spct.soLuong = spct.soLuong + :soLuong WHERE spct.id = :id")
    int increaseSoLuongById(@Param("id") Long id, @Param("soLuong") Integer soLuong);

    // tồn kho nhiều
    @Query("SELECT spct.sanPham.id AS id, spct.sanPham.tenSanPham AS tenSanPham, SUM(spct.soLuong) AS soLuongBanRa " +
            "FROM SanPhamChiTiet spct " +
            "GROUP BY spct.sanPham.id " +
            "ORDER BY soLuongBanRa DESC")
    List<Object[]> findTop5QuantityProducts();

    //tồn kho ít
    @Query("SELECT spct.sanPham.id AS id, spct.sanPham.tenSanPham AS tenSanPham, SUM(spct.soLuong) AS soLuongBanRa " +
            "FROM SanPhamChiTiet spct " +
            "GROUP BY spct.sanPham.id " +
            "ORDER BY soLuongBanRa ASC ")
    List<Object[]> findTop5NotQuantityProducts();

    // tỷ lệ lợi nhuận
    @Query("SELECT spct.sanPham.id AS id, spct.sanPham.tenSanPham AS tenSanPham, " +
            "((SUM(spct.giaBan * spct.soLuong) - SUM(spct.giaNhap * spct.soLuong)) / SUM(spct.giaNhap * spct.soLuong)) * 100 AS tyLeLoiNhuan " +
            "FROM SanPhamChiTiet spct " +
            "GROUP BY spct.sanPham.id, spct.sanPham.tenSanPham " +
            "ORDER BY tyLeLoiNhuan DESC")
    List<Object[]> findTop5ProfitMarginProducts();

    @Query("SELECT spct.sanPham.id AS id, spct.sanPham.tenSanPham AS tenSanPham, " +
            "((SUM(spct.giaBan * spct.soLuong) - SUM(spct.giaNhap * spct.soLuong)) / SUM(spct.giaNhap * spct.soLuong)) * 100 AS tyLeLoiNhuan " +
            "FROM SanPhamChiTiet spct " +
            "GROUP BY spct.sanPham.id, spct.sanPham.tenSanPham " +
            "ORDER BY tyLeLoiNhuan ASC ")
    List<Object[]> findTop5NotProfitMarginProducts();

    //lấy ra số lượng sản phẩm tồn theo id sản phẩm ()
    @Query("SELECT SUM(sct.soLuong), COALESCE(SUM(sct.soLuong * sct.giaBan), 0) AS giaTriHangTon " +"  FROM SanPhamChiTiet sct " +
            "WHERE sct.sanPham.id = :sanPhamId AND sct.trangThai = 1")
    Object[] findSoLuongConLaiTrongKho(@Param("sanPhamId") Long sanPhamId);

    //
    @Query("SELECT sct, (sct.giaBan / sct.giaNhap) * 100 AS loiNhuan " +
            "FROM SanPhamChiTiet sct " +
            "WHERE  sct.sanPham.id = :sanPhamId AND  sct.trangThai = 1")
    List<Object[]> findSanPhamChiTietVaLoiNhuan(@Param("sanPhamId") Long sanPhamId);

    //không biết làm gì?
    @Query("SELECT mauSac.ten, " +
            "       kichThuoc.giaTri, " +
            "       sanPhamChiTiet.soLuong " +
            "FROM SanPhamChiTiet sanPhamChiTiet " +
            "JOIN sanPhamChiTiet.mauSac mauSac " +
            "JOIN sanPhamChiTiet.kichThuoc kichThuoc " +
            "WHERE sanPhamChiTiet.sanPham.id = :sanPhamId AND sanPhamChiTiet.trangThai = 1 " +
            "ORDER BY mauSac.ten, kichThuoc.giaTri")
    List<Object[]> getDanhSachMauSac(@Param("sanPhamId") Long sanPhamId);
}
