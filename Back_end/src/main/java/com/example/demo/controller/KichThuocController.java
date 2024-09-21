package com.example.demo.controller;

import com.example.demo.entity.KichThuoc;
import com.example.demo.entity.MauSac;
import com.example.demo.repository.KichThuocRepository;
import com.example.demo.repository.MauSacRepository;
import com.example.demo.repository.TaiKhoanRepository;
import com.example.demo.service.KichThuocService;
import com.example.demo.dto.KichThuocDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor

@Tag(
        name = "CRUD REST API FOR SIZES RESOURCES",
        description = "CRUD REST API'S = CREATE, READ, UPDATE, DELETE"
)
@RequestMapping("/size")
@CrossOrigin(origins = "http://localhost:3000")
public class KichThuocController {

    private KichThuocService service;

    @Autowired
    private KichThuocRepository  mauSacRepository;
    @Autowired
    private TaiKhoanRepository taiKhoanRepository;

    @Operation(
            summary = "Get all Sizes REST API",
            description = "GET ALL PRODUCT FROM DATABASE"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status FOUNDED"
    )
    @GetMapping("")
    public ResponseEntity<?> getAllSizes() {
        List<KichThuocDto> list = service.getAllSize();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @Operation(
            summary = "Get all available Sizes REST API",
            description = "GET ALL PRODUCT FROM DATABASE"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status FOUNDED"
    )
    @GetMapping("/available")
    public ResponseEntity<?> getAllAvailableSizes() {
        List<KichThuocDto> list = service.getAllAvailableSize();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @Operation(
            summary = "Create size REST API",
            description = "Create Size FROM DATABASE"
    )
    @ApiResponse(
            responseCode = "201",
            description = "HTTP Status CREATED"
    )
    @PostMapping("/create/{uid}")
    public ResponseEntity<?> createSize(@RequestBody KichThuocDto KichThuocDto, @PathVariable("uid") String uid) {
        KichThuocDto KichThuocDto1 = service.createSize(KichThuocDto, uid);
        return new ResponseEntity<>(KichThuocDto1, HttpStatus.CREATED);
    }
    @PostMapping("/create2")
    public ResponseEntity<?> createSize2(@RequestBody KichThuocDto KichThuocDto) {
        KichThuocDto KichThuocDto1 = service.createSize(KichThuocDto, taiKhoanRepository.findByChucVu(0).get(0).getUid());
        return new ResponseEntity<>(KichThuocDto1, HttpStatus.CREATED);
    }

    @Operation(
            summary = "Get size by id REST API",
            description = "GET ALL Sizes FROM DATABASE"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status FOUNDED"
    )
    @GetMapping("/{id}")
    public ResponseEntity<?> getSizeById(@PathVariable("id") Long id) {
        KichThuocDto KichThuocDto = service.getById(id);
        return new ResponseEntity<>(KichThuocDto, HttpStatus.OK);
    }

    @Operation(
            summary = "Update size REST API",
            description = "UPDATE PRODUCT FROM DATABASE"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status Updated"
    )
    @PutMapping("/update/{uid}/{id}")
    public ResponseEntity<?> updateSize(@RequestBody KichThuocDto KichThuocDto, @PathVariable("id") Long id, @PathVariable("uid") String uid) {
        KichThuocDto KichThuocDto1 = service.updateSize(KichThuocDto, id, uid);
        return new ResponseEntity<>(KichThuocDto1, HttpStatus.OK);
    }
    @PutMapping("/update2/{id}")
    public ResponseEntity<?> updateSize2(@RequestBody KichThuocDto KichThuocDto, @PathVariable("id") Long id) {
        KichThuocDto KichThuocDto1 = service.updateSize(KichThuocDto, id,  taiKhoanRepository.findByChucVu(0).get(0).getUid());
        return new ResponseEntity<>(KichThuocDto1, HttpStatus.OK);
    }

    @Operation(
            summary = "Delete size REST API",
            description = "UPDATE SIZE FROM DATABASE"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status Updated"
    )
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteSizeById(@PathVariable("id") Long id) {
        service.deleteSize(id, taiKhoanRepository.findByChucVu(0).get(0).getUid());
        return new ResponseEntity<>("Product deleted successfully", HttpStatus.OK);
    }

    @PutMapping("/recover/{id}")
    public ResponseEntity<?> recover(@PathVariable("id") Long id) {
        KichThuoc ms = mauSacRepository.findById(id).get();
        ms.setTrangThai(true);

        mauSacRepository.save(ms);
        return new ResponseEntity<>("Kích thước deleted successfully", HttpStatus.OK);
    }
}
