package com.example.demo.service.serviceImpl;

import com.example.demo.entity.KichThuoc;
import com.example.demo.entity.TaiKhoan;
import com.example.demo.repository.KichThuocRepository;
import com.example.demo.repository.TaiKhoanRepository;
import com.example.demo.service.KichThuocService;
import com.example.demo.dto.KichThuocDto;
import com.example.demo.exception.NotAuthorizedException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.mapper.AutoSizeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class KichThuocServiceImpl implements KichThuocService {
    @Autowired
    private TaiKhoanRepository taiKhoanRepository;

    @Autowired
    private KichThuocRepository repository;

    @Override
    public KichThuocDto createSize(KichThuocDto kichThuocDto, String uid) {
        if(!checkUserAuthorization(uid)){
            throw new NotAuthorizedException("Tai khoan nay chua duoc xac thuc quyen nhan vien");
        }

        if(repository.findByGiaTri(kichThuocDto.getGiaTri()) != null){
            throw new NotAuthorizedException("kích thước đã tồn tại");
        }
        KichThuoc kichThuoc = AutoSizeMapper.MAPPER.mapToKichThuoc(kichThuocDto);
        repository.save(kichThuoc);
        return AutoSizeMapper.MAPPER.mapToKichThuocDto(kichThuoc);
    }

    @Override
    public KichThuocDto getById(Long id) {
        KichThuoc kichThuoc = repository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Kich thuoc", "id", id)
        );
        return AutoSizeMapper.MAPPER.mapToKichThuocDto(kichThuoc);
    }

    @Override
    public List<KichThuocDto> getAllSize() {
        return repository.findAll().stream().map(AutoSizeMapper.MAPPER :: mapToKichThuocDto).collect(Collectors.toList());
    }

    @Override
    public List<KichThuocDto> getAllAvailableSize() {
        return repository.findAll().stream()
                .filter(kichThuoc -> kichThuoc.getTrangThai()==true)
                .map(AutoSizeMapper.MAPPER :: mapToKichThuocDto).collect(Collectors.toList());
    }

    @Override
    public KichThuocDto updateSize(KichThuocDto updatedSize, Long id, String uid) {
        if(!checkUserAuthorization(uid)){
            throw new NotAuthorizedException("Tai khoan nay chua duoc xac thuc quyen nhan vien");
        }
        KichThuoc kichThuoc = repository.findById(id).orElseThrow(
                ()  -> new ResourceNotFoundException("Kich thuoc","id", id)
        );
        kichThuoc.setTrangThai(updatedSize.getTrangThai());
        kichThuoc.setGiaTri(updatedSize.getGiaTri());
        return AutoSizeMapper.MAPPER.mapToKichThuocDto(repository.save(kichThuoc));
    }

    @Override
    public void deleteSize(Long id, String uid) {
        if(!checkUserAuthorization(uid)){
            throw new NotAuthorizedException("Tai khoan nay chua duoc xac thuc quyen nhan vien");
        }
        KichThuoc kichThuoc = repository.findById(id).orElseThrow(
                ()  -> new ResourceNotFoundException("Kich thuoc","id", id)
        );
        try {
            repository.deleteById(id);
        }catch (Exception e){
            if(!kichThuoc.getTrangThai()){
                return;
            }
            kichThuoc.setTrangThai(false);
            repository.save(kichThuoc);
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
