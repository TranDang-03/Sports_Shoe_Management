package com.example.demo.controller;

import com.example.demo.entity.DanhMuc;
import com.example.demo.repository.DanhMucRepository;
import com.example.demo.repository.SanPhamDanhMucRepository;
import com.example.demo.repository.SanPhamRepository;
import com.example.demo.service.SanPhamDanhMucService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("san-pham-danh-muc")
@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
@Tag(
        name = "CRUD REST API FOR CATEGORY RESOURCES",
        description = "CRUD REST API'S = CREATE, READ, UPDATE, DELETE"
)
public class SanPhamDanhMucController {
    private SanPhamDanhMucService service;

    private SanPhamDanhMucRepository sanPhamDanhMucRepository;
    private DanhMucRepository danhMucRepository;

    @Operation(
            summary = "Create a san pham danh muc REST API",
            description = "CREATE A SPDM FROM DATABASE"
    )
    @ApiResponse(
            responseCode = "201",
            description = "HTTP Status CREATED"
    )
    @PostMapping("/create/{idSP}")
    public ResponseEntity<?> createSanPhamDanhMuc(@PathVariable("idSP")Long idSanPham, @RequestBody() List<String> danhMucs) {
        System.out.println(danhMucs);
        this.sanPhamDanhMucRepository.deleteBySanPhamId(idSanPham);
        for (String dm : danhMucs
        ) {
            ;
            service.createSPDM(idSanPham, this.danhMucRepository.findByTen(dm).getId());
        }
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @Operation(
            summary = "Get a list san pham danh muc bang san pham REST API",
            description = "GET A LIST SPDM BY SP FROM DATABASE"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status FOUNDED"
    )
    @GetMapping ("/get-all-san-pham")
    public ResponseEntity<?> getAllSPDMBySP(@RequestParam(name = "idSP", required = false)Long idSanPham) {

        return new ResponseEntity<>(this.sanPhamDanhMucRepository.findBySanPhamId(idSanPham), HttpStatus.OK);
    }

    @Operation(
            summary = "Get a list san pham danh muc bang danh muc REST API",
            description = "GET A LIST SPDM BY DM FROM DATABASE"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status FOUNDED"
    )
    @GetMapping ("/get-all-danh-muc/{idDM}")
    public ResponseEntity<?> getAllSPDMByDM(@PathVariable("idDM")Long idDanhMuc) {
        return new ResponseEntity<>(service.getAllSPDMByDM(idDanhMuc), HttpStatus.OK);
    }

    @Operation(
            summary = "Update a san pham danh muc bang danh muc REST API",
            description = "UPDATE SPDM FROM DATABASE"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status FOUNDED"
    )
    @PutMapping ("/update/{idSPDM}/{idSP}/{idDM}")
    public ResponseEntity<?> updateSPDM(@PathVariable("idSPDM")Long idSanPhamDanhMuc ,@PathVariable("idDM")Long idDanhMuc, @PathVariable("idSP")Long idSP) {
        return new ResponseEntity<>(service.updateSPDM(idSanPhamDanhMuc, idSP, idDanhMuc), HttpStatus.OK);
    }

    @Operation(
            summary = "Delete a san pham danh muc REST API",
            description = "DELETE SPDM FROM DATABASE"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status FOUNDED"
    )
    @PutMapping ("/delete/{idSP}/{idDM}")
    public ResponseEntity<?> deleteSPDM(@PathVariable("idDM")Long idDanhMuc, @PathVariable("idSP")Long idSP) {
        service.deleteSanPhamDanhMuc(idSP, idDanhMuc);
        return new ResponseEntity<>("Xoa san pham danh muc thanh cong", HttpStatus.OK);
    }
}