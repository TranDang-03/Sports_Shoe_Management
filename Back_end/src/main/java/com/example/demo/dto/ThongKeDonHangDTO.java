package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter

public class ThongKeDonHangDTO {
    private String thang;
    private Long soLuong;

    public ThongKeDonHangDTO(String thang, Long soLuong) {
        this.thang = thang;
        this.soLuong = soLuong;
    }

}
