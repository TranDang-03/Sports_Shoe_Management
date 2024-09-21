package com.example.demo.controller;

import com.example.demo.entity.SanPham;
import com.example.demo.mapper.AutoProductMapper;
import com.example.demo.repository.SanPhamRepository;
import com.example.demo.repository.TaiKhoanRepository;
import com.example.demo.service.SanPhamService;
import com.example.demo.dto.SanPhamDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;

@RestController
@AllArgsConstructor
@Tag(
        name = "CRUD REST API FOR PRODUCTS RESOURCES",
        description = "CRUD REST API'S = CREATE, READ, UPDATE, DELETE"
)
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:3000")
public class SanPhamController {

    private SanPhamService service;

    @Autowired
    private SanPhamRepository sanPhamRepository;
    @Autowired
    private TaiKhoanRepository taiKhoanRepository;

    @Operation(
            summary = "Get all products REST API",
            description = "GET ALL PRODUCT FROM DATABASE"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status FOUNDED"
    )
    @GetMapping("")
    public ResponseEntity<?> getAllProducts() {
        List<SanPhamDto> list = service.getAllProducts();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @Operation(
            summary = "Get all available products REST API",
            description = "GET ALL AVAILABLE PRODUCTS FROM DATABASE"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status FOUNDED"
    )

    @GetMapping("/available")
    public ResponseEntity<?> getAllAvailableProducts(
            @RequestParam(name = "name", required = false) String name,
            @RequestParam(name = "categories", required = false) List<Long> categories,
            @RequestParam(name = "brands", required = false) List<Long> brands,
            @RequestParam(name = "colors", required = false) List<Long> colors,
            @RequestParam(name = "sizes", required = false) List<Long> sizes,
            @RequestParam(name = "minPrice", required = false) BigDecimal minPrice,
            @RequestParam(name = "maxPrice", required = false) BigDecimal maxPrice) {


        //System.out.println("Tìm kiếm sản phẩm  có: " + "tên:" + name + ", danh mục:" + categories + ", thương hiệu: " + brands + ", màu sắc:" + colors + ", kích thước" + ", giá từ " + minPrice + " đến " + maxPrice);

        List<SanPham> productList = service.getAvailableProductsByParams(name, categories, brands, colors, sizes, minPrice, maxPrice);


        return new ResponseEntity<>(productList, HttpStatus.OK);
    }


    @Operation(
            summary = "Get all deleted products REST API",
            description = "GET ALL DELETED PRODUCTS FROM DATABASE"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status FOUNDED"
    )
    @GetMapping("/deleted")
    public ResponseEntity<?> getAllDeletedProducts() {
        List<SanPhamDto> list = service.getAllDeletedProducts();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @Operation(
            summary = "Create a PRODUCT REST API",
            description = "CREATE A PRODUCT FROM DATABASE"
    )
    @ApiResponse(
            responseCode = "201",
            description = "HTTP Status CREATED"
    )
    @PostMapping("/create/{uid}")
    public ResponseEntity<?> createAProduct(@RequestBody SanPhamDto sanPhamDto, @PathVariable("uid") String uid) {
        System.out.println("Sản phẩm nhận về:  " + sanPhamDto.toString());
        if (this.sanPhamRepository.findByMaSanPham(sanPhamDto.getMaSanPham()).isEmpty()) {
            System.out.println("UID:  " + uid);
            SanPhamDto sanPhamDto1 = service.createProduct(sanPhamDto, uid);
            return new ResponseEntity<>(sanPhamDto1, HttpStatus.CREATED);
        }

        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }

    @Operation(
            summary = "Get a product by id REST API",
            description = "GET PRODUCT BY ID FROM DATABASE"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status FOUNDED"
    )
    @GetMapping("/{id}")
    public ResponseEntity<?> getAProductById(@PathVariable("id") Long id) {
        SanPhamDto sanPhamDto = service.getById(id);
        return new ResponseEntity<>(sanPhamDto, HttpStatus.OK);
    }

    @Operation(
            summary = "Update product REST API",
            description = "UPDATE PRODUCT FROM DATABASE"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status Updated"
    )
    @PutMapping("/update/{uid}")
    public ResponseEntity<?> getAProductById(@RequestBody SanPham sanPhamDto,@PathVariable("uid") String uid) {
        SanPhamDto sanPhamsx = AutoProductMapper.MAPPER.mapToSanPhamDto(sanPhamDto);
        SanPhamDto sanPhamDto1 = service.updateProduct(sanPhamsx,sanPhamDto.getId(),uid);
        return new ResponseEntity<>(sanPhamDto1, HttpStatus.CREATED);

    }

    @Operation(
            summary = "Delete product REST API",
            description = "DELETE PRODUCT FROM DATABASE"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status Updated"
    )
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteAProductById(@PathVariable("id") Long id) {

        service.deleteSanPham(id,        taiKhoanRepository.findByChucVu(0).get(0).getUid());
        return new ResponseEntity<>("Product deleted successfully", HttpStatus.OK);
    }

    @Operation(
            summary = "Get all available products by brand by id REST API",
            description = "GET PRODUCT BY BRAND FROM DATABASE"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status FOUNDED"
    )
    @GetMapping("/brand/available/{id}")
    public ResponseEntity<?> getAllAvailableProductsByBrand(@PathVariable("id") Long id) {
        List<SanPhamDto> list = service.getAvailableBrandedProducts(id);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @Operation(
            summary = "Get all available products by brand by id REST API",
            description = "GET PRODUCT BY BRAND FROM DATABASE"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status FOUNDED"
    )
    @GetMapping("/brand/all/{id}")
    public ResponseEntity<?> getAllProductsByBrand(@PathVariable("id") Long id) {
        List<SanPhamDto> list = service.getAllBrandedProducts(id);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/getByIds")
    public ResponseEntity<?> getProductsByIds(@RequestParam("ls") List<Long> productIds) {
        System.out.println(productIds);
        List<SanPham> ls = this.sanPhamRepository.findAllByIds(productIds);
        return new ResponseEntity<>(ls, HttpStatus.OK);
    }
}
