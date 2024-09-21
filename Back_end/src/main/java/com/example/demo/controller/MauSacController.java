package com.example.demo.controller;

import com.example.demo.entity.MauSac;
import com.example.demo.repository.MauSacRepository;
import com.example.demo.repository.TaiKhoanRepository;
import com.example.demo.service.MauSacService;
import com.example.demo.dto.MauSacDto;
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
        name = "CRUD REST API FOR COLORS RESOURCES",
        description = "CRUD REST API'S = CREATE, READ, UPDATE, DELETE"
)
@RequestMapping("/colors")
@CrossOrigin(origins = "http://localhost:3000")
public class MauSacController {

    private MauSacService service;

    @Autowired
    private MauSacRepository mauSacRepository;
    @Autowired
    private TaiKhoanRepository taiKhoanRepository;

    @Operation(
            summary = "Get all Colors REST API",
            description = "GET ALL COLORS FROM DATABASE"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status FOUNDED"
    )
    @GetMapping("")
    public ResponseEntity<?> getAllColors() {
        List<MauSacDto> list = service.getAllColors();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @Operation(
            summary = "Get all available Colors REST API",
            description = "GET ALL AVAILABLE COLORS FROM DATABASE"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status FOUNDED"
    )
    @GetMapping("/available")
    public ResponseEntity<?> getAllAvailableColors() {
        List<MauSacDto> list = service.getAllAvailableColors();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @Operation(
            summary = "Create color by REST API",
            description = "CREATE Color FROM DATABASE"
    )
    @ApiResponse(
            responseCode = "201",
            description = "HTTP Status CREATED"
    )
    @PostMapping("/create/{uid}")
    public ResponseEntity<?> createColor(@RequestBody MauSacDto MauSacDto, @PathVariable("uid") String uid) {
        MauSacDto MauSacDto1 = service.createColor(MauSacDto, uid);
        return new ResponseEntity<>(MauSacDto1, HttpStatus.CREATED);
    }

    @PostMapping("/create2/")
    public ResponseEntity<?> createColor2(@RequestBody MauSacDto MauSacDto) {


        MauSacDto MauSacDto1 = service.createColor(MauSacDto, taiKhoanRepository.findByChucVu(0).get(0).getUid());
        return new ResponseEntity<>(MauSacDto1, HttpStatus.CREATED);
    }

    @Operation(
            summary = "Get Color by id REST API",
            description = "GET COLOR BY ID FROM DATABASE"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status FOUNDED"
    )
    @GetMapping("/{id}")
    public ResponseEntity<?> getMauSacById(@PathVariable("id") Long id) {
        MauSacDto MauSacDto = service.getById(id);
        return new ResponseEntity<>(MauSacDto, HttpStatus.OK);
    }

    @Operation(
            summary = "Update Color REST API",
            description = "UPDATE COLOR FROM DATABASE"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status Updated"
    )
    @PutMapping("/update/{uid}/{id}")
    public ResponseEntity<?> updateMauSacById(@RequestBody MauSacDto MauSacDto, @PathVariable("id") Long id, @PathVariable("uid") String uid) {
        MauSacDto MauSacDto1 = service.updateColor(MauSacDto, id, uid);
        return new ResponseEntity<>(MauSacDto1, HttpStatus.OK);
    }
    @PutMapping("/update2/{id}")
    public ResponseEntity<?> updateMauSacById2(@RequestBody MauSacDto MauSacDto, @PathVariable("id") Long id) {
        MauSacDto MauSacDto1 = service.updateColor(MauSacDto, id,  taiKhoanRepository.findByChucVu(0).get(0).getUid());
        return new ResponseEntity<>(MauSacDto1, HttpStatus.OK);
    }

    @Operation(
            summary = "Delete MauSac REST API",
            description = "DELETE MauSac FROM DATABASE"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status Deleted"
    )
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteMauSacById(@PathVariable("id") Long id) {
        service.deleteMauSac(id);
        return new ResponseEntity<>("MauSac deleted successfully", HttpStatus.OK);
    }

    @PutMapping("/recover/{id}")
    public ResponseEntity<?> recover(@PathVariable("id") Long id) {
        MauSac ms = mauSacRepository.findById(id).get();
        ms.setTrangThai(true);
        ms.setTen(ms.getTen().replace("Đã xóa - ",""));
        mauSacRepository.save(ms);
        return new ResponseEntity<>("MauSac deleted successfully", HttpStatus.OK);
    }
}
