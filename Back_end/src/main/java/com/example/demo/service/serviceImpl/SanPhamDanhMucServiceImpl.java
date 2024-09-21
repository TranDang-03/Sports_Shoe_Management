package com.example.demo.service.serviceImpl;

import com.example.demo.dto.SanPhamDanhMucDto;
import com.example.demo.entity.DanhMuc;
import com.example.demo.entity.SanPham;
import com.example.demo.entity.SanPhamDanhMuc;
import com.example.demo.exception.AttributeNotValidException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.mapper.AutoSanPhamDanhMucMapper;
import com.example.demo.repository.DanhMucRepository;
import com.example.demo.repository.SanPhamDanhMucRepository;
import com.example.demo.repository.SanPhamRepository;
import com.example.demo.service.SanPhamDanhMucService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SanPhamDanhMucServiceImpl implements SanPhamDanhMucService {

    @Autowired
    private SanPhamDanhMucRepository repository;
    @Autowired
    private DanhMucRepository repositoryDM;
    @Autowired
    private SanPhamRepository repositorySP;

    @Override
    public List<SanPhamDanhMucDto> getAllSPDMByDM(Long idDM) {
        return repository.findAll().stream()
                .filter(sanPhamDanhMuc ->
                        sanPhamDanhMuc.getDanhMuc()
                                .equals(repositoryDM.findById(idDM)
                                        .map(danhMuc -> danhMuc.getTrangThai() == true)
                                        .orElseThrow(
                                                () -> new ResourceNotFoundException("Danh muc", "id", idDM)
                                        )))
                .map(AutoSanPhamDanhMucMapper.MAPPER :: mapToSanPhamDanhMucDto)
                .collect(Collectors.toList());
    }

    @Override
    public SanPhamDanhMucDto updateSPDM(Long idSPDM, Long idSP, Long idDM) {
        SanPhamDanhMuc sanPhamDanhMuc = repository.findById(idSPDM)
                .orElseThrow(() -> new ResourceNotFoundException("San pham danh muc", "id", idSPDM));
        DanhMuc danhMuc = repositoryDM.findById(idDM)
                .orElseThrow(() -> new ResourceNotFoundException("Danh muc", "id", idDM));
        if(danhMuc.getTrangThai() == false){
            throw new AttributeNotValidException("Danh muc","id", idDM);
        }
        SanPham sanPham = repositorySP.findById(idSP)
                .orElseThrow(() -> new ResourceNotFoundException("San pham", "id", idSP));
        if(sanPham.getTrangThai() == 0){
            throw new AttributeNotValidException("San pham","id", idSP);
        }
        sanPhamDanhMuc.setDanhMuc(danhMuc);
        sanPhamDanhMuc.setSanPham(sanPham);
        return AutoSanPhamDanhMucMapper.MAPPER.mapToSanPhamDanhMucDto(repository.save(sanPhamDanhMuc));
    }

    @Override
    public void deleteSanPhamDanhMuc(Long idSP, Long idDM) {
        SanPhamDanhMuc sanPhamDanhMuc= repository.findById(idSP).orElseThrow(
                () -> new ResourceNotFoundException("San pham danh muc", "id", idSP)
        );
        repository.delete(sanPhamDanhMuc);
    }

    @Override
    public List<SanPhamDanhMucDto> getAllSPDMBySP(Long idSP) {
        return repository.findAll().stream()
                .filter(sanPhamDanhMuc ->
                        sanPhamDanhMuc.getDanhMuc()
                                .equals(repositorySP.findById(idSP)
                                        .map(sanPham -> sanPham.getTrangThai() == 1)
                                        .orElseThrow(
                                                () -> new ResourceNotFoundException("San pham", "id", idSP)
                                        )))
                .map(AutoSanPhamDanhMucMapper.MAPPER :: mapToSanPhamDanhMucDto)
                .collect(Collectors.toList());
    }

    @Override
    public SanPhamDanhMucDto createSPDM(Long idSP, Long idDM) {
        SanPham sanPham = repositorySP.findById(idSP)
                .orElseThrow(
                        () -> new ResourceNotFoundException("San pham", "id", idSP)
                );
        if(sanPham.getTrangThai() == 0 ){
            throw new AttributeNotValidException("San pham", "id", idSP);
        }
        DanhMuc danhMuc = repositoryDM.findById(idDM)
                .orElseThrow(
                        () -> new ResourceNotFoundException("Danh muc", "id", idDM)
                );
        if(danhMuc.getTrangThai() == false ){
            throw new AttributeNotValidException("Danh muc", "id", idDM);
        }
        SanPhamDanhMuc sanPhamDanhMuc = new SanPhamDanhMuc();
        sanPhamDanhMuc.setSanPham(sanPham);
        sanPhamDanhMuc.setDanhMuc(danhMuc);
        return AutoSanPhamDanhMucMapper.MAPPER.mapToSanPhamDanhMucDto(repository.save(sanPhamDanhMuc));
    }
}
