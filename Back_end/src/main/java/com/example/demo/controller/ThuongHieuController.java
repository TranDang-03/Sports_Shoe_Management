package com.example.demo.controller;

import com.example.demo.dto.ThuongHieuDto;
import com.example.demo.repository.ThuongHieuRepository;
import com.example.demo.service.ThuongHieuService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("thuong-hieu")
@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
@Tag(
        name = "CRUD REST API FOR BRANDS RESOURCES",
        description = "CRUD REST API'S = CREATE, READ, UPDATE, DELETE"
)
public class ThuongHieuController {
    private ThuongHieuService service;
    private ThuongHieuRepository thuongHieuRepository;

    @Operation(
            summary = "Create a brand REST API",
            description = "CREATE A BRAND FROM DATABASE"
    )
    @ApiResponse(
            responseCode = "201",
            description = "HTTP Status CREATED"
    )
    @PostMapping("/create")
    public ResponseEntity<?> createThuongHieu(@RequestBody ThuongHieuDto thuongHieuDto) {
        return new ResponseEntity<>(service.createThuongHieu(thuongHieuDto), HttpStatus.CREATED);
    }

    @Operation(
            summary = "Get all brands REST API",
            description = "GET ALL BRANDS FROM DATABASE"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status CREATED"
    )
    @GetMapping("/get-all")
    public ResponseEntity<?> getAllThuongHieu() {
        return new ResponseEntity<>(service.getAllThuongHieu(), HttpStatus.OK);
    }

    @GetMapping("/get-all2")
    public ResponseEntity<?> getAllThuongHieu2() {
        return new ResponseEntity<>(thuongHieuRepository.findAll(), HttpStatus.OK);
    }

    @Operation(
            summary = "Get all brands by product id REST API",
            description = "GET ALL BRANDS FROM DATABASE"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status FOUND"
    )
    @GetMapping("/get-all-by-san-pham/{idSP}")
    public ResponseEntity<?> getAllThuongHieuBySP(@PathVariable("idSP")Long idSP) {
        return new ResponseEntity<>(service.findAllThuongHieuBySanPham(idSP), HttpStatus.OK);
    }


    @Operation(
            summary = "Update a brand REST API",
            description = "UPDATE BRAND FROM DATABASE"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status OK"
    )
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateThuongHieu(@RequestBody ThuongHieuDto thuongHieuDto, @PathVariable("id") Long id) {
        return new ResponseEntity<>(service.updateThuongHieu(thuongHieuDto, id), HttpStatus.OK);
    }

    @PutMapping("/recover/{id}")
    public ResponseEntity<?> updateThuongHieu2(@RequestBody ThuongHieuDto thuongHieuDto, @PathVariable("id") Long id) {
        thuongHieuDto.setTrangThai(true);
        thuongHieuDto.setTen(thuongHieuDto.getTen().replace("Đã xóa - ",""));
        System.out.println(thuongHieuDto.getTen());
        return new ResponseEntity<>(service.updateThuongHieu(thuongHieuDto, id), HttpStatus.OK);
    }

    @Operation(
            summary = "Delete a brand REST API",
            description = "DELETE BRAND FROM DATABASE"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status DELETED"
    )
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteThuongHieu(@PathVariable ("id")Long id) {
        service.deleteThuongHieu(id);
        return new ResponseEntity<>("Xoa thanh cong thuong hieu", HttpStatus.OK);
    }
}
