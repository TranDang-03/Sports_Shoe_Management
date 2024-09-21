package com.example.demo.service.serviceImpl;

import com.example.demo.entity.HoaDonChiTiet;
import com.example.demo.repository.HoaDonChiTietRepository;
import com.example.demo.service.HoaDonChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.FluentQuery;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@Service
public class HoaDonChiTietServiceImpl implements HoaDonChiTietService {
    @Autowired
    private HoaDonChiTietRepository hoaDonChiTietRepository;

    @Override
    public List<HoaDonChiTiet> getAll(String idHD) {
        return hoaDonChiTietRepository.getAll(idHD);
    }


    @Override
    public List<HoaDonChiTiet> get(Long idHD, Long idHDCT) {
        return hoaDonChiTietRepository.get(idHD, idHDCT);
    }

    @Override
    public void flush() {
        hoaDonChiTietRepository.flush();
    }

    @Override
    public <S extends HoaDonChiTiet> S saveAndFlush(S entity) {
        return hoaDonChiTietRepository.saveAndFlush(entity);
    }

    @Override
    public <S extends HoaDonChiTiet> List<S> saveAllAndFlush(Iterable<S> entities) {
        return hoaDonChiTietRepository.saveAllAndFlush(entities);
    }

    @Override
    @Deprecated
    public void deleteInBatch(Iterable<HoaDonChiTiet> entities) {
        hoaDonChiTietRepository.deleteInBatch(entities);
    }

    @Override
    public void deleteAllInBatch(Iterable<HoaDonChiTiet> entities) {
        hoaDonChiTietRepository.deleteAllInBatch(entities);
    }

    @Override
    public void deleteAllByIdInBatch(Iterable<Long> longs) {
        hoaDonChiTietRepository.deleteAllByIdInBatch(longs);
    }

    @Override
    public void deleteAllInBatch() {
        hoaDonChiTietRepository.deleteAllInBatch();
    }

    @Override
    @Deprecated
    public HoaDonChiTiet getOne(Long aLong) {
        return hoaDonChiTietRepository.getOne(aLong);
    }

    @Override
    @Deprecated
    public HoaDonChiTiet getById(Long aLong) {
        return hoaDonChiTietRepository.getById(aLong);
    }

    @Override
    public HoaDonChiTiet getReferenceById(Long aLong) {
        return hoaDonChiTietRepository.getReferenceById(aLong);
    }

    @Override
    public <S extends HoaDonChiTiet> List<S> findAll(Example<S> example) {
        return hoaDonChiTietRepository.findAll(example);
    }

    @Override
    public <S extends HoaDonChiTiet> List<S> findAll(Example<S> example, Sort sort) {
        return hoaDonChiTietRepository.findAll(example, sort);
    }

    @Override
    public <S extends HoaDonChiTiet> List<S> saveAll(Iterable<S> entities) {
        return hoaDonChiTietRepository.saveAll(entities);
    }

    @Override
    public List<HoaDonChiTiet> findAll() {
        return hoaDonChiTietRepository.findAll();
    }

    @Override
    public List<HoaDonChiTiet> findAllById(Iterable<Long> longs) {
        return hoaDonChiTietRepository.findAllById(longs);
    }

    @Override
    public <S extends HoaDonChiTiet> S save(S entity) {
        return hoaDonChiTietRepository.save(entity);
    }

    @Override
    public Optional<HoaDonChiTiet> findById(Long aLong) {
        return hoaDonChiTietRepository.findById(aLong);
    }

    @Override
    public boolean existsById(Long aLong) {
        return hoaDonChiTietRepository.existsById(aLong);
    }

    @Override
    public long count() {
        return hoaDonChiTietRepository.count();
    }

    @Override
    public void deleteById(Long aLong) {
        hoaDonChiTietRepository.deleteById(aLong);
    }

    @Override
    public void delete(HoaDonChiTiet entity) {
        hoaDonChiTietRepository.delete(entity);
    }

    @Override
    public void deleteAllById(Iterable<? extends Long> longs) {
        hoaDonChiTietRepository.deleteAllById(longs);
    }

    @Override
    public void deleteAll(Iterable<? extends HoaDonChiTiet> entities) {
        hoaDonChiTietRepository.deleteAll(entities);
    }

    @Override
    public void deleteAll() {
        hoaDonChiTietRepository.deleteAll();
    }

    @Override
    public List<HoaDonChiTiet> findAll(Sort sort) {
        return hoaDonChiTietRepository.findAll(sort);
    }

    @Override
    public Page<HoaDonChiTiet> findAll(Pageable pageable) {
        return hoaDonChiTietRepository.findAll(pageable);
    }

    @Override
    public <S extends HoaDonChiTiet> Optional<S> findOne(Example<S> example) {
        return hoaDonChiTietRepository.findOne(example);
    }

    @Override
    public <S extends HoaDonChiTiet> Page<S> findAll(Example<S> example, Pageable pageable) {
        return hoaDonChiTietRepository.findAll(example, pageable);
    }

    @Override
    public <S extends HoaDonChiTiet> long count(Example<S> example) {
        return hoaDonChiTietRepository.count(example);
    }

    @Override
    public <S extends HoaDonChiTiet> boolean exists(Example<S> example) {
        return hoaDonChiTietRepository.exists(example);
    }

    @Override
    public <S extends HoaDonChiTiet, R> R findBy(Example<S> example, Function<FluentQuery.FetchableFluentQuery<S>, R> queryFunction) {
        return hoaDonChiTietRepository.findBy(example, queryFunction);
    }
}
