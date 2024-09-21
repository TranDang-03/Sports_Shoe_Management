package com.example.demo.controller;

import com.example.demo.entity.GioHang;
import com.example.demo.entity.SanPhamChiTiet;
import com.example.demo.repository.GioHangRepository;
import com.example.demo.repository.SanPhamChiTietRepository;
import com.example.demo.repository.TaiKhoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Locale;

@RestController
@RequestMapping("/api/gio-hang")
@CrossOrigin(origins = "http://localhost:3000")
public class GioHangController {

    @Autowired
    private GioHangRepository gioHangRepository;

    @Autowired
    private SanPhamChiTietRepository sanPhamChiTietRepository;

    @Autowired
    private TaiKhoanRepository taiKhoanRepository;


    @GetMapping("/{id}")
    public ResponseEntity<List<GioHang>> getAll(@PathVariable("id") String uid) {
        List<GioHang> ls = this.gioHangRepository.findByTaiKhoanUid(uid);
        for (GioHang x: ls
        ) {
            if(x.getSanPhamChiTiet().getSanPham().getTrangThai() ==0 ){
                this.gioHangRepository.deleteById(x.getId());
            }

        }
        ls = this.gioHangRepository.findByTaiKhoanUid(uid);
        return ResponseEntity.ok(ls);
    }

    @PostMapping("create")
    public ResponseEntity<GioHang> add(@RequestParam("uid") String uid, @RequestParam("sp") Long sp, @RequestParam("sl") Integer sl) {
        GioHang Cart = new GioHang();

        if (this.gioHangRepository.findByTaiKhoanUidAndSanPhamChiTietId(uid, sp) != null) {
            Cart = this.gioHangRepository.findByTaiKhoanUidAndSanPhamChiTietId(uid, sp);
            if (this.sanPhamChiTietRepository.findById(sp).get().getSoLuong() < Cart.getSoLuong() + sl) {
                return new ResponseEntity(null, HttpStatus.BAD_REQUEST);
            }
            Cart.setSoLuong(Cart.getSoLuong() + sl);


            return ResponseEntity.ok(this.gioHangRepository.save(Cart));
        } else {
            Cart.setSoLuong(sl);
            Cart.setNgayTao(LocalDate.now());
            Cart.setSanPhamChiTiet(this.sanPhamChiTietRepository.findById(sp).get());
            Cart.setTaiKhoan(this.taiKhoanRepository.findById(uid).get());


            return ResponseEntity.ok(this.gioHangRepository.save(Cart));
        }

    }

    @PutMapping("quantity")
    public ResponseEntity<GioHang> capNhat(@RequestBody() GioHang gh) {
        return new ResponseEntity(this.gioHangRepository.save(gh), HttpStatus.OK);

    }

    @DeleteMapping("delete/{id}")
    public void xoa(@PathVariable("id") Long sp) {
        this.gioHangRepository.deleteById(sp);
    }
}