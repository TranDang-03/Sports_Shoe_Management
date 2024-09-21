package com.example.demo.validate;

import com.example.demo.repository.KichThuocRepository;
import com.example.demo.repository.MauSacRepository;
import com.example.demo.repository.SanPhamChiTietRepository;
import com.example.demo.repository.SanPhamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@Service
public class CTSPValidate {

    /**
     * validate số lượng
     * @param error
     * @param value
     * @return
     */
    public Map<String, Object> validateSoLuong(Map<String, Object> error, String value) {
        try {
            int soLuong = Integer.parseInt(value);
            if (soLuong < 0) {
                error = initialMap(error);
                error.put("soLuong", "Phải lớn hơn hoặc bằng 0");
            }
        } catch (NumberFormatException e) {
            error = initialMap(error);
            error.put("soLuong", "Phải là số");
        }

        return error;
    }

    /**
     * validate BigDecimal
     * @param error
     * @param value
     * @return
     */
    public Map<String, Object> validateBigDecimail(Map<String, Object> error, String value, String key) {
        try {
            double convertToDouble = Double.parseDouble(value);
            BigDecimal giaNhap = BigDecimal.valueOf(convertToDouble);
            if (giaNhap.compareTo(BigDecimal.ZERO) == -1) {
                error = initialMap(error);
                error.put(key, "Giá phải nhập ít nhất là 0");
            }
        } catch (NumberFormatException e) {
            error = initialMap(error);
            error.put(key, "Phải là số");
        }

        return error;
    }


    /**
     * validate BigDecimal
     * @param error
     * @param value
     * @return
     */
    @Autowired
    MauSacRepository msRepo;
    public Map<String, Object> validateMauSac(Map<String, Object> error, Long value, String key) {
        try {
            if (value == null) {
                error = initialMap(error);
                error.put(key, "Màu sắc không được để trống ");
            }
            else{
                if (!msRepo.existsById(value)){
                    error = initialMap(error);
                    error.put(key, "Màu sắc không tồn tại ");
                }
            }
        } catch (NumberFormatException e) {
            error = initialMap(error);
            error.put(key, "Không thể call vào db");
        }
        return error;
    }


    /**
     * validate BigDecimal
     * @param error
     * @param value
     * @return
     */
    @Autowired
    SanPhamRepository spRepo;
    public Map<String, Object> validateSanPham(Map<String, Object> error, Long value, String key) {
        try {
            if (value == null) {
                error = initialMap(error);
                error.put(key, "Sản phẩm không được để trống ");
            }
            else{
                if (!spRepo.existsById(value)){
                    error = initialMap(error);
                    error.put(key, "Sản phẩm không tồn tại ");
                }
            }
        } catch (NumberFormatException e) {
            error = initialMap(error);
            error.put(key, "Không thể call vào db");
        }
        return error;
    }


    /**
     * validate BigDecimal
     * @param error
     * @param value
     * @return
     */
    @Autowired
    KichThuocRepository ktRepo;
    public Map<String, Object> validateKichThuoc(Map<String, Object> error, Long value, String key) {
        try {
            if (value == null) {
                error = initialMap(error);
                error.put(key, "Kích thước không được để trống ");
            }
            else{
                if (!ktRepo.existsById(value)){
                    error = initialMap(error);
                    error.put(key, "Kích thước không tồn tại ");
                }
            }
        } catch (NumberFormatException e) {
            error = initialMap(error);
            error.put(key, "Không thể call vào db");
        }
        return error;
    }

    /**
     * validate BigDecimal
     * @param error
     * @param mauSacId
     * @param sanPhamId
     * @param kichThuocId
     * @return
     */
    @Autowired
    SanPhamChiTietRepository spctRepo;
    public Map<String, Object> validate3khoaPhu(Map<String, Object> error, Long mauSacId, Long sanPhamId, Long kichThuocId, String key) {
        try {
            if (spctRepo.existsByMauSacIdAndSanPhamIdAndKichThuocId(mauSacId, sanPhamId, kichThuocId)){
                error = initialMap(error);
                error.put(key, "Màu sắc - Sản phẩm - Kích thước đã tồn tại");
            }
        } catch (NumberFormatException e) {
            error = initialMap(error);
            error.put(key, "Không thể call vào db");
        }
        return error;
    }


    public Map<String, Object> initialMap(Map<String, Object> map){
        if (map == null){
            map = new HashMap<>();
        }
        return map;
    }
}
