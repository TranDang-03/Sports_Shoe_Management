package com.example.demo.controller;

import com.example.demo.repository.HoaDonChiTietRepository;
import com.example.demo.repository.HoaDonKhuyenMaiRepository;
import com.example.demo.repository.HoaDonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequestMapping("/test/staff")
@CrossOrigin(origins = "http://localhost:3000")
public class TestControllerNotBad {

    @Autowired
    private HoaDonKhuyenMaiRepository hoaDonKhuyenMaiRepository;

    @Autowired
    private HoaDonRepository hoaDonRepository;


    @GetMapping("9i")
    public ResponseEntity<?> Eoax() {


        return ResponseEntity.ok(this.hoaDonRepository.findHoaDonNgayHienTai());
    }

    @GetMapping("7i")
    public ResponseEntity<?> Eoax2() {


        return ResponseEntity.ok(this.hoaDonRepository.findTaiKhoanAndSoLuongHoaDon());
    }
    @GetMapping("8i")
    public ResponseEntity<?> c13ddasc() {


        return ResponseEntity.ok(this.hoaDonKhuyenMaiRepository.findKhuyenMaiAndSoLuongHoaDon());
    }


}
