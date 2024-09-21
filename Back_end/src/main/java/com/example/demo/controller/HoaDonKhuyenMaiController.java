package com.example.demo.controller;

import com.example.demo.entity.HoaDonKhuyenMai;
import com.example.demo.entity.KhuyenMai;
import com.example.demo.repository.HoaDonKhuyenMaiRepository;
import com.example.demo.repository.KhuyenMaiRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@AllArgsConstructor


@RequestMapping("/voucherBill")
@CrossOrigin(origins = "http://localhost:3000")
public class HoaDonKhuyenMaiController {


    @Autowired
    private HoaDonKhuyenMaiRepository hoaDonKhuyenMaiRepository;
    @Autowired
    private KhuyenMaiRepository khuyenMaiRepository;

    @GetMapping("{hd}")
    public ResponseEntity<HoaDonKhuyenMai> getSale(@PathVariable("hd") Long hoaDonId) {
        HoaDonKhuyenMai km = this.hoaDonKhuyenMaiRepository.findByHoaDon_Id(hoaDonId);

        if (km == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(km, HttpStatus.OK);
    }


    @PostMapping("")
    public ResponseEntity<?> getMa (@RequestBody HoaDonKhuyenMai hoaDonKhuyenMai){
        KhuyenMai kmx = this.khuyenMaiRepository.findById(hoaDonKhuyenMai.getKhuyenMai().getId()).get();
        System.out.println("khuyen mai hoa don "+kmx.toString());
        LocalDate currentDate = LocalDate.now();
        if(!currentDate.isBefore(kmx.getBatDau()) && !currentDate.isAfter(kmx.getKetThuc()) && !currentDate.isEqual(kmx.getKetThuc())){
            HoaDonKhuyenMai km = this.hoaDonKhuyenMaiRepository.save(hoaDonKhuyenMai);
            return new ResponseEntity<>(km, HttpStatus.CREATED);
        }


        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }
}
