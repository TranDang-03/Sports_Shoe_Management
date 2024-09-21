package com.example.demo.service.serviceImpl;

import com.example.demo.entity.SanPham;
import com.example.demo.entity.TaiKhoan;
import com.example.demo.repository.SanPhamRepository;
import com.example.demo.repository.TaiKhoanRepository;
import com.example.demo.service.SanPhamService;
import com.example.demo.dto.SanPhamDto;
import com.example.demo.exception.NameAlreadyExistException;
import com.example.demo.exception.NotAuthorizedException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.mapper.AutoProductMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.*;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class SanPhamServiceImpl implements SanPhamService {
    @Autowired
    private TaiKhoanRepository taiKhoanRepository;

    @Autowired
    private SanPhamRepository repository;

    @Override
    public List<SanPham> getAvailableProductsByParams(String name, List<Long> categories, List<Long> brands, List<Long> colors, List<Long> sizes, BigDecimal minPrice, BigDecimal maxPrice) {
        return repository.findAvailableProductsByParams(name, categories, brands, colors, sizes, minPrice, maxPrice);
    }


    @Override
    public SanPhamDto createProduct(SanPhamDto sanPhamDto, String uid) {
        if (!checkUserAuthorization(uid)) {
            throw new NotAuthorizedException("Tài khoản này ko phải nhân viên");
        }
        if(this.checkNameExist(sanPhamDto.getTenSanPham())){
            throw new NameAlreadyExistException("Tên sản phẩm đã tồn tại");
        }
        if(this.checkMaExist(sanPhamDto.getMaSanPham())){
            throw new NameAlreadyExistException("Mã sản phẩm đã tồn tại");
        }

        SanPham sanPham = AutoProductMapper.MAPPER.mapToSanPham(sanPhamDto);
        sanPham.setNgayTao(LocalDate.now());
        repository.save(sanPham);
        return AutoProductMapper.MAPPER.mapToSanPhamDto(sanPham);
    }

    @Override
    public SanPhamDto getById(Long id) {
        SanPham sanPham = repository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("SanPham", "id", id)
        );
        return AutoProductMapper.MAPPER.mapToSanPhamDto(sanPham);
    }

    @Override
    public List<SanPhamDto> getAllProducts() {
        return repository.findAll().stream()
                .map(AutoProductMapper.MAPPER::mapToSanPhamDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<SanPhamDto> getAllAvailableProducts() {
        return repository.findAll().stream().map(AutoProductMapper.MAPPER::mapToSanPhamDto)
                .filter(sanPhamDto -> sanPhamDto.getTrangThai() == 1)
                .collect(Collectors.toList());
    }

    @Override
    public List<SanPhamDto> getAllDeletedProducts() {
        return repository.findAll().stream().map(AutoProductMapper.MAPPER::mapToSanPhamDto)
                .filter(sanPhamDto -> sanPhamDto.getTrangThai() == 0)
                .collect(Collectors.toList());
    }

    @Override
    public List<SanPhamDto> getAvailableBrandedProducts(Long idThuongHieu) {
        return repository.findAll().stream()
                .map(AutoProductMapper.MAPPER::mapToSanPhamDto)
                .filter(sanPhamDto -> sanPhamDto.getTrangThai() == 1 && sanPhamDto.getThuongHieu().getId() == (idThuongHieu))
                .collect(Collectors.toList());
    }

    @Override
    public List<SanPhamDto> getAllBrandedProducts(Long idThuongHieu) {
        return repository.findAll().stream()
                .map(AutoProductMapper.MAPPER::mapToSanPhamDto)
                .filter(sanPhamDto -> sanPhamDto.getThuongHieu().getId() == (idThuongHieu))
                .collect(Collectors.toList());
    }

    @Override
    public SanPhamDto updateProduct(SanPhamDto updateSanPham, Long id, String uid) {

        updateSanPham.setTenSanPham(updateSanPham.getTenSanPham().replace("Đã xóa - ",""));

        if (!checkUserAuthorization(uid)) {
            throw new NotAuthorizedException("Tài khoản này không phải nhân viên");
        }

        SanPham sanPham = repository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("SanPham", "id", id)
        );

        if(!Objects.equals(sanPham.getMaSanPham(), updateSanPham.getMaSanPham())){
            if(this.checkMaExist(updateSanPham.getMaSanPham())){
                throw new NameAlreadyExistException("Mã sản phẩm đã tồn tại");
            }
        }

        if(!Objects.equals(sanPham.getTenSanPham(), updateSanPham.getTenSanPham())){
            if(this.checkNameExist(updateSanPham.getTenSanPham())){
                throw new NameAlreadyExistException("Tên sản phẩm đã tồn tại");
            }
        }

        //Vietname hour set UTC 7++
        Instant currentTime = Instant.now();
        ZoneId vietnamTimeZone = ZoneId.of("Asia/Ho_Chi_Minh");
        ZonedDateTime vietnamTime = currentTime.atZone(vietnamTimeZone);
        Instant updatedInstant = vietnamTime.toInstant();
        sanPham.setNgayCapNhat(updatedInstant);

        sanPham.setTenSanPham(updateSanPham.getTenSanPham());
        sanPham.setTrangThai(updateSanPham.getTrangThai());
        sanPham.setThuongHieu(updateSanPham.getThuongHieu());
        sanPham.setMaSanPham(updateSanPham.getMaSanPham());

        sanPham.setMoTa(updateSanPham.getMoTa());
        return AutoProductMapper.MAPPER.mapToSanPhamDto(repository.save(sanPham));
    }

    @Override
    public void deleteSanPham(Long id, String uid) {
        if (!checkUserAuthorization(uid)) {
            throw new NotAuthorizedException("Tai khoan nay chua duoc xac thuc quyen nhan vien");
        }
        SanPham sanPham = repository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Mau sac", "id", id)
        );
        try {
            repository.deleteById(sanPham.getId());
        }catch (Exception e){
            if (sanPham.getTrangThai() == 0) {
                return;
            }
            sanPham.setTenSanPham("Đã xóa - " + sanPham.getTenSanPham());
            sanPham.setTrangThai(0);
            repository.save(sanPham);
        }
    }

    private boolean checkUserAuthorization(String userUid) {
        TaiKhoan taiKhoan = taiKhoanRepository.findById(userUid).orElseThrow(
                () -> new ResourceNotFoundException("TaiKhoan", "uid", userUid)
        );
        if (taiKhoan.getChucVu() == 0) {
            return true;
        }
        return false;
    }

    private boolean checkNameExist(String name) {
        boolean check = false;
        SanPham sanPham = repository.checkExistProductName(name);
        if (sanPham != null) {
            check = true;
        }
        return check;
    }

    private boolean checkMaExist(String name) {
        if(name.isEmpty()){
            return false;
        }
        boolean check = false;
        List<SanPham> sanPham = repository.findByMaSanPham(name);
        if (!sanPham.isEmpty()) {
            check = true;
        }
        return check;
    }
}
