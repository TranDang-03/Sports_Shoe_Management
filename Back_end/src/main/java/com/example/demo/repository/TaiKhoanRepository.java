package com.example.demo.repository;

import com.example.demo.entity.TaiKhoan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaiKhoanRepository extends JpaRepository<TaiKhoan, String> {

    @Query("SELECT chucVu FROM TaiKhoan WHERE uid = :id")
    int findChucVuById(@Param("id") String id);

    TaiKhoan findTaiKhoanByUid(String uid);

    List<TaiKhoan> findByChucVu(int cv);
}
