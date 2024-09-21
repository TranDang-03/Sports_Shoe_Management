package com.example.demo.service.serviceImpl;

import com.example.demo.dto.DanhMucDto;
import com.example.demo.entity.DanhMuc;
import com.example.demo.exception.NameAlreadyExistException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.mapper.AutoDanhMucMapper;
import com.example.demo.mapper.AutoThuongHieuMapper;
import com.example.demo.repository.DanhMucRepository;
import com.example.demo.service.DanhMucService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DanhMucServiceImpl implements DanhMucService {
    @Autowired
    private DanhMucRepository repository;

    @Override
    public List<DanhMucDto> getAllDanhMuc() {
        return repository.findAll().stream()
                .map(AutoDanhMucMapper.MAPPER :: mapToDanhMucDto)
                .filter(danhMucDto -> danhMucDto.getTrangThai() == true)
                .collect(Collectors.toList());
    }

    @Override
    public DanhMucDto createDanhMuc(DanhMucDto danhMucDto) {
        if(danhMucDto.getTen().trim().isEmpty()){
            throw new NameAlreadyExistException("Tên không được để trống");
        }
        DanhMuc danhMuc = AutoDanhMucMapper.MAPPER.mapToDanhMuc(danhMucDto);
        DanhMuc danhMucInDatabase = repository.findByTen(danhMucDto.getTen());

        if (danhMucInDatabase == null || (danhMucInDatabase.getId() == null && danhMucInDatabase.getTen() == null)) {
            repository.save(danhMuc);
            return AutoDanhMucMapper.MAPPER.mapToDanhMucDto(danhMuc);
        } else {
            throw new NameAlreadyExistException("Tên danh mục đã tồn tại");
        }

    }

    @Override
    public DanhMucDto getById(Long id) {
        return repository.findById(id)
                .map(AutoDanhMucMapper.MAPPER :: mapToDanhMucDto)
                .orElseThrow(
                        () -> new ResourceNotFoundException("Danh muc", "id", id)
                );
    }
    //Chi co the sua ten
    @Override
    public DanhMucDto updateDanhMuc(DanhMucDto danhMucDto, Long id) {
        DanhMuc danhMuc = repository.findById(id)
                .orElseThrow(
                        () -> new ResourceNotFoundException("Danh muc", "id", id)
                );

        danhMuc.setTen(danhMucDto.getTen());
        danhMuc.setTrangThai(danhMucDto.getTrangThai());
        repository.save(danhMuc);
        return AutoDanhMucMapper.MAPPER.mapToDanhMucDto(danhMuc);
    }

    @Override
    public void deleteDanhMuc(Long id) {
        DanhMuc danhMuc = repository.findById(id)
                .orElseThrow(
                        () -> new ResourceNotFoundException("Danh muc", "id", id)
                );
        try {
            repository.deleteById(id);
        }catch (Exception e){
            danhMuc.setTen("Đã xóa - " + danhMuc.getTen());
            danhMuc.setTrangThai(false);
            repository.save(danhMuc);
        }
    }
}
