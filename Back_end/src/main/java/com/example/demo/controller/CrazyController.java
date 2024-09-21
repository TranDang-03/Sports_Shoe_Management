package com.example.demo.controller;

import com.example.demo.entity.HoaDon;
import com.example.demo.entity.HoaDonChiTiet;
import com.example.demo.entity.SanPham;
import com.example.demo.entity.SanPhamChiTiet;
import com.example.demo.repository.HoaDonChiTietRepository;
import com.example.demo.repository.HoaDonRepository;
import com.example.demo.repository.SanPhamChiTietRepository;
import com.example.demo.repository.SanPhamRepository;
import com.example.demo.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Objects;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class CrazyController {
    @Autowired
    private SanPhamChiTietRepository sanPhamChiTietRepository;

    @Autowired
    private SanPhamRepository sanPhamRepository;

    @Autowired
    public EmailService emailService;
    @Autowired
    private HoaDonRepository hoaDonRepository;
    @Autowired
    private HoaDonChiTietRepository hoaDonChiTietRepository;

    @GetMapping("/SPXX1243/v1/getPrice/{id}")
    public ResponseEntity<String> getPrice(@PathVariable("id") Long id) {
        String price;
        List<SanPhamChiTiet> ls = sanPhamChiTietRepository.findBySanPhamIdAndTrangThai(id, 1);

        price = gopGiaLonNhatVaNhoNhat(ls);
        return new ResponseEntity<>(price, HttpStatus.OK);
    }

    public static String gopGiaLonNhatVaNhoNhat(List<SanPhamChiTiet> danhSachSanPham) {
        if (danhSachSanPham.isEmpty()) {
            return "0.0"; // Hoặc bạn có thể trả về giá trị mặc định khác nếu danh sách rỗng.
        }

        BigDecimal giaCaoNhat = danhSachSanPham.get(0).getGiaBan();
        BigDecimal giaThapNhat = danhSachSanPham.get(0).getGiaBan();

        for (SanPhamChiTiet sanPham : danhSachSanPham) {
            BigDecimal gia = sanPham.getGiaBan();
            if (gia.compareTo(giaCaoNhat) > 0) {
                giaCaoNhat = gia;
            }
            if (gia.compareTo(giaThapNhat) < 0) {
                giaThapNhat = gia;
            }
        }

        DecimalFormatSymbols symbols = new DecimalFormatSymbols(Locale.US);
        DecimalFormat decimalFormat = new DecimalFormat("#,###.##", symbols);
        String giaCaoNhatFormatted = decimalFormat.format(giaCaoNhat);
        String giaThapNhatFormatted = decimalFormat.format(giaThapNhat);


        if (Objects.equals(giaCaoNhatFormatted, giaThapNhatFormatted)) {

            return giaCaoNhatFormatted + "₫";
        }
        return giaThapNhatFormatted + "₫ - " + giaCaoNhatFormatted + "₫";
    }

    @GetMapping("/hightPrice/1234d")
    public ResponseEntity<SanPhamChiTiet> hightPrice() {
        return ResponseEntity.ok(this.sanPhamChiTietRepository.findTopByOrderByGiaBanDesc());
    }

    @GetMapping("/allOffBill")
    public ResponseEntity<List<HoaDon>> allnill(@RequestParam(name = "kbh", required = false, defaultValue = "3") int kbh) {
        List<HoaDon> lks = this.hoaDonRepository.findAllByOrderByNgayTaoDesc();
        List<HoaDon> filteredHoaDons = new ArrayList<>();

        for (HoaDon hoaDon : lks) {
            if (hoaDon.getTenNguoiNhan() != null ) {
                filteredHoaDons.add(hoaDon);
            }
        }
        return ResponseEntity.ok(filteredHoaDons);
    }

    @GetMapping("/getOneBill/{id}")
    public ResponseEntity<HoaDon> GEToNE(@PathVariable("id") Long id) {
        return ResponseEntity.ok(this.hoaDonRepository.findById(id).get());
    }
    @Async
    public void sendEmailAsync(String to, String subject, String body) {
        emailService.sendEmail(to, subject, body);
    }
    //    http://localhost:8080/api/updateBill?idHD=1&TT=1
    @PutMapping("updateBill")
    public ResponseEntity<HoaDon> updateBill(@RequestParam("idHD") Long id, @RequestParam("TT") Integer tt) {
        HoaDon hd = this.hoaDonRepository.findById(id).get();
        if (tt == 6) {
            System.out.println("Đã nhận là hủy đơn ");
            //   sendEmailAsync(hd.getTaiKhoan().getEmail(), "Hóa đơn đã bị hủy", "Đơn hàng của bạn đã bị hủy, xin vui lòng cảm ơn");

            List<HoaDonChiTiet> ls = this.hoaDonChiTietRepository.findAllByHoaDon_Id(hd.getId());
            for (HoaDonChiTiet hdct : ls
            ) {
                //hoàn trả số lượng
                int check = this.sanPhamChiTietRepository.increaseSoLuongById(hdct.getSanPhamChiTiet().getId(), hdct.getSoLuong());


            }
        }
        hd.setTrangThai(tt);
        return ResponseEntity.ok(this.hoaDonRepository.save(hd));
    }

    @GetMapping("Search")
    public ResponseEntity<List<SanPham>> search(@RequestParam("search") String txt) {
        return new ResponseEntity<>(this.sanPhamRepository.searchByFullText(txt), HttpStatus.OK);
    }


    @GetMapping("HomeChart")
    public ResponseEntity<?> getChartData(@RequestParam("StartDate") String sd, @RequestParam("EndDate") String ed) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        return new ResponseEntity<>(this.hoaDonRepository.findNgayTaoAndSoLuongHoaDonBetween(LocalDate.parse(sd, formatter), LocalDate.parse(ed, formatter)), HttpStatus.OK);
    }

    @GetMapping("HomeChart2")
    public ResponseEntity<?> getChartData2(@RequestParam("StartDate") String sd, @RequestParam("EndDate") String ed) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        return new ResponseEntity<>(this.hoaDonRepository.findByNgayTaoBetween(LocalDate.parse(sd, formatter), LocalDate.parse(ed, formatter)), HttpStatus.OK);
    }

    @GetMapping("TopSell")
    public ResponseEntity<?> getX() {
        List<Object[]> ls = this.hoaDonChiTietRepository.findTop10SellingProducts();
        if (ls.size() >= 10) {
            return new ResponseEntity<>(ls.subList(0, 10), HttpStatus.OK);
        }
        return new ResponseEntity<>(ls, HttpStatus.OK);
    }

    @GetMapping("TopNotSell")
    public ResponseEntity<?> getXY() {
        List<Object[]> ls = this.hoaDonChiTietRepository.findTop10NotSellingProducts();
        if (ls.size() >= 10) {
            return new ResponseEntity<>(ls.subList(0, 10), HttpStatus.OK);
        }
        return new ResponseEntity<>(ls, HttpStatus.OK);
    }

    @GetMapping("TopQuantity")
    public ResponseEntity<?> getXO() {
        return new ResponseEntity<>(this.sanPhamChiTietRepository.findTop5QuantityProducts().subList(0, 10), HttpStatus.OK);
    }

    @GetMapping("TopNotQuantity")
    public ResponseEntity<?> getX1O() {
        return new ResponseEntity<>(this.sanPhamChiTietRepository.findTop5NotQuantityProducts().subList(0, 10), HttpStatus.OK);
    }

    @GetMapping("TopNothing")
    public ResponseEntity<?> getXO2() {
        return new ResponseEntity<>(this.sanPhamChiTietRepository.findTop5ProfitMarginProducts().subList(0, 10), HttpStatus.OK);
    }

    @GetMapping("TopNotNothing")
    public ResponseEntity<?> getXO21() {
        return new ResponseEntity<>(this.sanPhamChiTietRepository.findTop5NotProfitMarginProducts().subList(0, 10), HttpStatus.OK);
    }

    @GetMapping("SOld")
    public ResponseEntity<?> getX123() {
        return new ResponseEntity<>(this.hoaDonChiTietRepository.getTotalQuantitySold(), HttpStatus.OK);

    }

    @GetMapping("Cancel")
    public ResponseEntity<?> getX12323() {
        return new ResponseEntity<>(this.hoaDonChiTietRepository.getTotalQuantityCancel(), HttpStatus.OK);
    }


    @GetMapping("Other")
    public ResponseEntity<?> getX122323() {
        return new ResponseEntity<>(this.hoaDonChiTietRepository.getTotalQuantityOther(), HttpStatus.OK);
    }

    @GetMapping("allx")
    public ResponseEntity<?> getX11xx3() {
        return new ResponseEntity<>(this.hoaDonChiTietRepository.getQuantityByStatus(), HttpStatus.OK);
    }
    @GetMapping("tonKho/{id}")
    public ResponseEntity<?> getTonKho(@PathVariable("id")Long id) {
        System.out.println("đã lấy tồn kho cho sản phẩm " + id);
        return new ResponseEntity<>(this.sanPhamChiTietRepository.findSoLuongConLaiTrongKho(id), HttpStatus.OK);
    }

    @GetMapping("daBan/{id}")
    public ResponseEntity<?> getTongDaBan(@PathVariable("id")Long id) {
        System.out.println("đã lấy tồn kho cho sản phẩm " + id);
        return new ResponseEntity<>(this.hoaDonChiTietRepository.findThongTinBanHang(id), HttpStatus.OK);
    }
    @GetMapping("mauHot/{id}")
    public ResponseEntity<?> getMH(@PathVariable("id")Long id) {

        return new ResponseEntity<>(this.hoaDonChiTietRepository.findMauSacBanChayNhat(id), HttpStatus.OK);
    }

    @GetMapping("ktHot/{id}")
    public ResponseEntity<?> getKTH(@PathVariable("id")Long id) {

        return new ResponseEntity<>(this.hoaDonChiTietRepository.findKichThuocBanChayNhat(id), HttpStatus.OK);
    }
    @GetMapping("4x/{id}")
    public ResponseEntity<?> getKTH2(@PathVariable("id")Long id) {

        return new ResponseEntity<>(this.sanPhamChiTietRepository.getDanhSachMauSac(id), HttpStatus.OK);
    }
    @GetMapping("3x/{id}")
    public ResponseEntity<?> getKTH23(@PathVariable("id")Long id) {

        return new ResponseEntity<>(this.hoaDonChiTietRepository.findxsa(id), HttpStatus.OK);
    }

    @PutMapping("RECOVER/{id}")
    public ResponseEntity<?> reve(@PathVariable("id")Long id) {
        SanPhamChiTiet sanPhamChiTiet = this.sanPhamChiTietRepository.findById(id).get();
        sanPhamChiTiet.setTrangThai(1);

        return new ResponseEntity<>(this.sanPhamChiTietRepository.save(sanPhamChiTiet), HttpStatus.OK);
    }
}
