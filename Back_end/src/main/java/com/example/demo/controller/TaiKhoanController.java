package com.example.demo.controller;

import com.example.demo.entity.TaiKhoan;
import com.example.demo.repository.TaiKhoanRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("tai-khoan")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")

public class TaiKhoanController {

    @Autowired
    private TaiKhoanRepository taiKhoanRepository;

    @GetMapping("chuc-vu")
    public ResponseEntity<?> GetChucVu(@RequestParam("uid") String uid) {
        return new ResponseEntity<>(this.taiKhoanRepository.findChucVuById(uid), HttpStatus.OK);
    }

    @PostMapping("create")
    public ResponseEntity<?> Createa(@RequestBody TaiKhoan tk) {

        if (this.taiKhoanRepository.findTaiKhoanByUid(tk.getUid()) == null) {
            if (tk.getChucVu() == null) {
                tk.setChucVu(1);
            }
        } else {
            if (tk.getChucVu() == null) {
                tk.setChucVu(this.taiKhoanRepository.findTaiKhoanByUid(tk.getUid()).getChucVu());
            }
        }
        try {
            return new ResponseEntity<>(this.taiKhoanRepository.save(tk), HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping()
    public ResponseEntity<?> getxTK(@RequestParam("cv") int cv) {

        return new ResponseEntity<>(this.taiKhoanRepository.findByChucVu(cv), HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateRole(@RequestParam("uid") String uid , @RequestParam("role") int cv){
        TaiKhoan tk = this.taiKhoanRepository.findTaiKhoanByUid(uid);
        if( this.taiKhoanRepository.findByChucVu(tk.getChucVu()).size() == 1 && tk.getChucVu() ==0 ){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        tk.setChucVu(cv);
        return new ResponseEntity<>(this.taiKhoanRepository.save(tk), HttpStatus.OK);
    }
}
