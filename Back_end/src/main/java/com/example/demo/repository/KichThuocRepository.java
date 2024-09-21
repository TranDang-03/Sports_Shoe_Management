package com.example.demo.repository;

import com.example.demo.entity.KichThuoc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

@Repository
public interface KichThuocRepository extends JpaRepository<KichThuoc, Long> {
    KichThuoc findByGiaTri(BigDecimal gt);
}
