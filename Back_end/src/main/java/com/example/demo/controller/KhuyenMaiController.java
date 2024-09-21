package com.example.demo.controller;

import com.example.demo.entity.KhuyenMai;
import com.example.demo.repository.KhuyenMaiRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Locale;

@RestController
@AllArgsConstructor

@Tag(
        name = "CRUD REST API FOR voucher RESOURCES",
        description = "CRUD REST API'S = CREATE, READ, UPDATE, DELETE"
)
@RequestMapping("/voucher")
@CrossOrigin(origins = "http://localhost:3000")
public class KhuyenMaiController {
    @Autowired
    private KhuyenMaiRepository khuyenMaiRepository;


    @GetMapping("/{ma}")
    public ResponseEntity<?> getMa(@PathVariable("ma") String Ma) {
        KhuyenMai km = this.khuyenMaiRepository.findByMa(Ma);
        if (km != null) {
            return new ResponseEntity<>(km, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }


    @GetMapping("")
    public ResponseEntity<?> getMaAll() {
        List<KhuyenMai> km = this.khuyenMaiRepository.findAll();
        if (!km.isEmpty()) {
            return new ResponseEntity<>(km, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @PostMapping("/{type}")
    public ResponseEntity<?> add(@RequestBody KhuyenMai khuyenMai, @PathVariable("type") int type) {

        if (type == 1) {
            khuyenMai.setGiamGiaTruThang(BigDecimal.valueOf(0));
        } else {
            khuyenMai.setGiamGiaPhanTram(0);
        }
        KhuyenMai kmCheck = this.khuyenMaiRepository.findByMa(khuyenMai.getMa());
        if (kmCheck != null && khuyenMai.getId() == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        KhuyenMai km = this.khuyenMaiRepository.save(khuyenMai);

        return new ResponseEntity<>(km, HttpStatus.CREATED);


    }

    @PutMapping("/{id}")
    public ResponseEntity<?> x(@PathVariable("id") Long id) {
        KhuyenMai khuyenMai = this.khuyenMaiRepository.findById(id).get();
        khuyenMai.setKetThuc(LocalDate.now());
        KhuyenMai km = this.khuyenMaiRepository.save(khuyenMai);

        return new ResponseEntity<>(km, HttpStatus.CREATED);


    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> xx(@PathVariable("id") Long id) {

        try {
            khuyenMaiRepository.deleteById(id);
            return new ResponseEntity<>(null, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
        }


    }

}
