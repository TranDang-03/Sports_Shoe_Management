package com.example.demo.controller;

import com.example.demo.dto.DanhMucDto;
import com.example.demo.repository.DanhMucRepository;
import com.example.demo.service.DanhMucService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("danh-muc")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@Tag(
        name = "CRUD REST API FOR CATEGORY RESOURCES",
        description = "CRUD REST API'S = CREATE, READ, UPDATE, DELETE"
)
public class DanhMucController {
    private DanhMucService service;
    private DanhMucRepository danhMucRepository;

    @Operation(
            summary = "Create a category REST API",
            description = "CREATE A category FROM DATABASE"
    )
    @ApiResponse(
            responseCode = "201",
            description = "HTTP Status CREATED"
    )
    @PostMapping("/create")
    public ResponseEntity<?> createDanhMuc(@RequestBody DanhMucDto DanhMucDto) {
        return new ResponseEntity<>(service.createDanhMuc(DanhMucDto), HttpStatus.CREATED);
    }

    @Operation(
            summary = "Get all CATEGORY REST API",
            description = "GET ALL CATEGORY FROM DATABASE"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status OK"
    )
    @GetMapping("/get-all")
    public ResponseEntity<?> getAllDanhMuc() {
        return new ResponseEntity<>(service.getAllDanhMuc(), HttpStatus.OK);
    }

    @GetMapping("/get-all2")
    public ResponseEntity<?> getAllDanhMuc2() {
        return new ResponseEntity<>(danhMucRepository.findAll(), HttpStatus.OK);
    }

    @Operation(
            summary = "Update a category REST API",
            description = "UPDATE category FROM DATABASE"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status OK"
    )
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateDanhMuc(@RequestBody DanhMucDto DanhMucDto, @PathVariable("id") Long id) {
        return new ResponseEntity<>(service.updateDanhMuc(DanhMucDto, id), HttpStatus.OK);
    }
    @PutMapping("/recover/{id}")
    public ResponseEntity<?> updateDanhMuc2(@RequestBody DanhMucDto DanhMucDto, @PathVariable("id") Long id) {
        DanhMucDto.setTrangThai(true);
        DanhMucDto.setTen(DanhMucDto.getTen().replace("Đã xóa - ",""));
        System.out.println(DanhMucDto.getTen());
        return new ResponseEntity<>(service.updateDanhMuc(DanhMucDto, id), HttpStatus.OK);
    }

    @Operation(
            summary = "Delete a category REST API",
            description = "DELETE category FROM DATABASE"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status DELETED"
    )
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteDanhMuc(@PathVariable ("id")Long id) {
        service.deleteDanhMuc(id);
        return new ResponseEntity<>("Xoa thanh cong danh muc", HttpStatus.OK);
    }
}
