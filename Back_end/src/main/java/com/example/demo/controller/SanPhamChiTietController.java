package com.example.demo.controller;

import com.example.demo.bean.ChiTietSanPhamCreate;
import com.example.demo.service.SanPhamChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("api/admin/san-pham-chi-tiet")
@CrossOrigin(origins = "http://localhost:3000")
public class SanPhamChiTietController {

    @Autowired
    public SanPhamChiTietService sanPhamChiTietService;

    @GetMapping
    ResponseEntity<?> getAll(){
        return this.sanPhamChiTietService.getAll();
    }

    @GetMapping("/type1")
    ResponseEntity<?> findType1(@RequestParam Long idSP ){

        System.out.println("Người dùng vừa mở chi tiết sản phẩm và cho Id  "+ idSP);
        return this.sanPhamChiTietService.findBySanPhamIdAndTrangThai(idSP,1);
    }

    @GetMapping("/type0")
    ResponseEntity<?> findType0(@RequestParam Long idSP ){
        return this.sanPhamChiTietService.findBySanPhamIdAndTrangThai(idSP,0);
    }


    @GetMapping("/SPAndMS")
    ResponseEntity<?> findSPAndMS(@RequestParam Long idSP, @RequestParam Long idMS){
        return this.sanPhamChiTietService.findBySanPhamIdAndMauSacId(idSP,idMS);
    }


    @GetMapping("/gia-min-max")
    ResponseEntity<?> findGiaBanMinMaxByIDSP(@RequestParam Long idSP){
        return this.sanPhamChiTietService.findGiaBanMinMaxByIDSP(idSP);
    }


    @PostMapping
    ResponseEntity<?> create(@RequestBody ChiTietSanPhamCreate chiTietSanPhamCreate){
        System.out.println("Người dùng yêu cầu thêm sản phẩm chi tiết: "+ chiTietSanPhamCreate);
        return this.sanPhamChiTietService.create(chiTietSanPhamCreate);
    }

    @PutMapping
    ResponseEntity<?> update(@RequestBody ChiTietSanPhamCreate chiTietSanPhamCreate){
        return this.sanPhamChiTietService.update(chiTietSanPhamCreate);
    }

    @DeleteMapping ("/{id}")
    ResponseEntity<?> delete(@PathVariable Long id){
        this.sanPhamChiTietService.removeById(id);
        return ResponseEntity.ok().body("ok");
    }

    @PutMapping("/sl/up/{idSPCT}")
    ResponseEntity<?> updateUp(@PathVariable Long idSPCT,@RequestBody Integer soluong){
        if (this.sanPhamChiTietService.updateSoLuongById(idSPCT,soluong)){
            return ResponseEntity.ok("ok");
        }else {
            return ResponseEntity.ok("that bai");
        }
    }

    @PutMapping("/sl/down/{idSPCT}")
    ResponseEntity<?> updateDown(@PathVariable Long idSPCT,@RequestBody Integer soluong){
        if (this.sanPhamChiTietService.updateSoLuongById(idSPCT,-soluong)){
            return ResponseEntity.ok("ok");
        }else {
            return ResponseEntity.ok("that bai");
        }

    }

    @GetMapping("/getMSByIDSP/{idSP}")
    ResponseEntity<?> getMSByIDSP(@PathVariable Long idSP){
        return ResponseEntity.ok(this.sanPhamChiTietService.findAllMSByIDSP(idSP));

    }
    @GetMapping("/getSPByIDMS/{idMS}")
    ResponseEntity<?> getSPByIDMS(@PathVariable Long idMS){
        return ResponseEntity.ok(this.sanPhamChiTietService.findAllSPByIDMS(idMS));
    }
    @GetMapping("/getSPByIDKT/{idKT}")
    ResponseEntity<?> getSPByIDKT(@PathVariable Long idKT){



        return ResponseEntity.ok(this.sanPhamChiTietService.findAllSPByIDKT(idKT));
    }

}
