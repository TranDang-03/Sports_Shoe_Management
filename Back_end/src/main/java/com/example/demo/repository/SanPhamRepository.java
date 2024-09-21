package com.example.demo.repository;

import com.example.demo.dto.SanPhamDto;
import com.example.demo.entity.SanPham;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface SanPhamRepository extends JpaRepository<SanPham, Long> {
    @Query(value = "SELECT * FROM end_game.san_pham where ten_san_pham = :productName ", nativeQuery = true)
    SanPham checkExistProductName(@Param("productName") String productName);


    @Query("SELECT sp FROM SanPham sp " +
            "LEFT JOIN sp.thuongHieu th " +
            "LEFT JOIN SanPhamChiTiet spt ON sp.id = spt.sanPham.id " +
            "LEFT JOIN spt.mauSac ms " +
            "LEFT JOIN spt.kichThuoc kt " +
            "LEFT JOIN SanPhamDanhMuc spdm ON sp.id = spdm.danhMuc.id " +
            "LEFT JOIN DanhMuc dm ON dm.id = spdm.danhMuc.id" + " "+
            "WHERE (:name IS NULL OR sp.tenSanPham LIKE %:name%) " +
            "AND (:categories IS NULL OR dm.id IN :categories) " +
            "AND (:brands IS NULL OR th.id IN :brands) " +
            "AND (:colors IS NULL OR ms.id IN :colors) " +
            "AND (:sizes IS NULL OR kt.id IN :sizes) " +
            "AND (:minPrice IS NULL OR spt.giaBan >= :minPrice) " +
            "AND (:maxPrice IS NULL OR spt.giaBan <= :maxPrice) " +
            "AND sp.trangThai = 1")
    List<SanPham> findAvailableProductsByParams(
            @Param("name") String name,
            @Param("categories") List<Long> categories,
            @Param("brands") List<Long> brands,
            @Param("colors") List<Long> colors,
            @Param("sizes") List<Long> sizes,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice);



    @Query(value = "SELECT * FROM san_pham WHERE MATCH(ten_san_pham, ma_san_pham, mo_ta) AGAINST (:searchTerm IN BOOLEAN MODE)", nativeQuery = true)
    List<SanPham> searchByFullText(@Param("searchTerm") String searchTerm);

    @Query("SELECT p FROM SanPham p WHERE p.id IN :ids")
    List<SanPham> findAllByIds(@Param("ids") List<Long> ids);

    List<SanPham> findByMaSanPham(String ma);


}
