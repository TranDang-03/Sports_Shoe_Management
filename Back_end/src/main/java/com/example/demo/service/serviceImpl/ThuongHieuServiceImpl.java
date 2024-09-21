package com.example.demo.service.serviceImpl;

import com.example.demo.dto.ThuongHieuDto;
import com.example.demo.entity.ThuongHieu;
import com.example.demo.exception.NameAlreadyExistException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.mapper.AutoThuongHieuMapper;
import com.example.demo.repository.ThuongHieuRepository;
import com.example.demo.service.ThuongHieuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ThuongHieuServiceImpl implements ThuongHieuService {
    @Autowired
    private ThuongHieuRepository repository;

    @Override
    public List<ThuongHieuDto> getAllThuongHieu() {
        return repository.findAll().stream()
                .map(AutoThuongHieuMapper.MAPPER :: mapToThuongHieuDto)
                .filter(thuonghieuDto -> thuonghieuDto.getTrangThai() == true)
                .collect(Collectors.toList());
    }

    @Override
    public ThuongHieuDto createThuongHieu(ThuongHieuDto thuongHieuDto) {
        if(thuongHieuDto.getTen().trim().isEmpty()){
            throw new NameAlreadyExistException("Tên không được để trống");
        }
        ThuongHieu thuonghieu = AutoThuongHieuMapper.MAPPER.mapToThuongHieu(thuongHieuDto);
        if(!this.repository.findByTen(thuongHieuDto.getTen()).isEmpty()){
            throw new NameAlreadyExistException("Tên thương hiệu đã tồn tại");
        }else {
            repository.save(thuonghieu);
            return AutoThuongHieuMapper.MAPPER.mapToThuongHieuDto(thuonghieu);

        }

    }

    @Override
    public ThuongHieuDto getById(Long id) {
        return repository.findById(id)
                .map(AutoThuongHieuMapper.MAPPER :: mapToThuongHieuDto)
                .orElseThrow(
                        () -> new ResourceNotFoundException("Thuong hieu", "id", id)
                );
    }
    //Chi dc sua ten
    @Override
    public ThuongHieuDto updateThuongHieu(ThuongHieuDto thuongHieuDto, Long id) {
        ThuongHieu thuongHieu = repository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Thuong hieu", "id", id)
        );
        thuongHieu.setTen(thuongHieuDto.getTen());
        thuongHieu.setTrangThai(thuongHieuDto.getTrangThai());
        repository.save(thuongHieu);
        return AutoThuongHieuMapper.MAPPER.mapToThuongHieuDto(thuongHieu);
    }

    @Override
    public List<ThuongHieuDto> findAllThuongHieuBySanPham(Long idSP) {
        return repository.findAllThuongHieuBySanPham(idSP).stream()
                .filter(thuonghieuDto -> thuonghieuDto.getTrangThai() == true)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteThuongHieu(Long id) {
        ThuongHieu thuongHieu = repository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Thuong hieu", "id", id)
        );
        try {
            repository.deleteById(id);
        }catch (Exception e){
            if(!thuongHieu.getTrangThai() == true ){
                return;
            }
            thuongHieu.setTen("Đã xóa - " + thuongHieu.getTen());
            thuongHieu.setTrangThai(false);
            repository.save(thuongHieu);
        }
    }
}
