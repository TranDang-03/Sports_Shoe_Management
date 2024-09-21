package com.example.demo.service;

import com.example.demo.entity.TaiKhoan;

import java.util.List;
import java.util.Optional;

public interface TaiKhoanService {
    Optional<TaiKhoan> findById(String s);

    boolean checkChucVu(List<Integer> values, String id);
}
