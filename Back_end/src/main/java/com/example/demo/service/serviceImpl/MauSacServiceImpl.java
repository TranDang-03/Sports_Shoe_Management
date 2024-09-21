package com.example.demo.service.serviceImpl;

import com.example.demo.entity.MauSac;
import com.example.demo.entity.TaiKhoan;
import com.example.demo.repository.MauSacRepository;
import com.example.demo.repository.TaiKhoanRepository;
import com.example.demo.service.MauSacService;
import com.example.demo.dto.MauSacDto;
import com.example.demo.exception.NotAuthorizedException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.mapper.AutoColorsMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MauSacServiceImpl implements MauSacService {

    @Autowired
    private TaiKhoanRepository taiKhoanRepository;

    @Autowired
    private MauSacRepository repository;

    @Override
    public MauSacDto createColor(MauSacDto mauSacDto, String uid) {
        if(!checkUserAuthorization(uid)){
            throw new NotAuthorizedException("Tai khoan nay chua duoc xac thuc quyen nhan vien");
        }
        if(repository.findByGiaTriAndTen(mauSacDto.getGiaTri(),mauSacDto.getTen()) != null){
            throw new NotAuthorizedException("Màu sắc đã tồn tại");
        }
        MauSac mauSac = AutoColorsMapper.MAPPER.mapToMauSac(mauSacDto);
        repository.save(mauSac);
        return AutoColorsMapper.MAPPER.mapToMauSacDto(mauSac);
    }

    @Override
    public MauSacDto getById(Long id) {
        MauSac mauSac = repository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Mau sac", "id", id)
        );
        return AutoColorsMapper.MAPPER.mapToMauSacDto(mauSac);
    }

    @Override
    public List<MauSacDto> getAllColors() {
        return repository.findAll().stream().map(AutoColorsMapper.MAPPER :: mapToMauSacDto).collect(Collectors.toList());
    }

    @Override
    public List<MauSacDto> getAllAvailableColors() {
        return repository.findAll().stream()
                .map(AutoColorsMapper.MAPPER :: mapToMauSacDto)
                .filter(mauSacDto -> mauSacDto.getTrangThai())
                .collect(Collectors.toList());
    }

    @Override
    public MauSacDto updateColor(MauSacDto updateMauSac, Long id, String uid) {
        if(!checkUserAuthorization(uid)){
            throw new NotAuthorizedException("Tai khoan nay chua duoc xac thuc quyen nhan vien");
        }
        MauSac mauSac = repository.findById(id).orElseThrow(
                ()  -> new ResourceNotFoundException("Mau sac","id", id)
        );
        mauSac.setTen(updateMauSac.getTen());
        mauSac.setTrangThai(updateMauSac.getTrangThai());
        mauSac.setGiaTri(updateMauSac.getGiaTri());
        return AutoColorsMapper.MAPPER.mapToMauSacDto(repository.save(mauSac));
    }

    @Override
    public void deleteMauSac(Long id) {

        MauSac mauSac = repository.findById(id).orElseThrow(
                ()  -> new ResourceNotFoundException("Mau sac","id", id)
        );
        try {
            repository.deleteById(id);
        }catch (Exception e){
            if(!mauSac.getTrangThai()){
                return;
            }
            mauSac.setTen("Đã xóa - " + mauSac.getTen());
            mauSac.setTrangThai(false);
            repository.save(mauSac);
        }

    }

    private boolean checkUserAuthorization(String userUid){
        TaiKhoan taiKhoan = taiKhoanRepository.findById(userUid).orElseThrow(
                () -> new ResourceNotFoundException("TaiKhoan", "uid", userUid)
        );
        if(taiKhoan.getChucVu()==0){
            return true;
        }
        return false;
    }
}
