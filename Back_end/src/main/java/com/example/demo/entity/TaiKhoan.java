package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Entity
@ToString
@Table(name = "tai_khoan")
public class TaiKhoan {
    @Id
    @Column(name = "UID", nullable = false)
    private String uid;


    @Column(name = "ten", nullable = true)
    private String ten;
    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "trang_thai", nullable = false)
    private Boolean trangThai = false;

    @Column(name = "chuc_vu", nullable = false)
    private Integer chucVu;

}
