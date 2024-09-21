package com.example.demo.service.serviceImpl;

import com.example.demo.entity.HoaDon;
import com.example.demo.repository.HoaDonRepository;
import com.example.demo.service.HoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.FluentQuery;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@Service
public class HoaDonServiceImpl  implements HoaDonService{
    @Autowired
    private HoaDonRepository hoaDonRepository;


    @Override
    public List<HoaDon> getAll(String idKH) {
        return hoaDonRepository.getAll(idKH);
    }

    public void flush() {
        hoaDonRepository.flush();
    }

    @Override
    public <S extends HoaDon> S saveAndFlush(S entity) {
        return hoaDonRepository.saveAndFlush(entity);
    }

    @Override
    public <S extends HoaDon> List<S> saveAllAndFlush(Iterable<S> entities) {
        return hoaDonRepository.saveAllAndFlush(entities);
    }

    @Override
    @Deprecated
    public void deleteInBatch(Iterable<HoaDon> entities) {
        hoaDonRepository.deleteInBatch(entities);
    }

    @Override
    public void deleteAllInBatch(Iterable<HoaDon> entities) {
        hoaDonRepository.deleteAllInBatch(entities);
    }

    @Override
    public void deleteAllByIdInBatch(Iterable<Long> longs) {
        hoaDonRepository.deleteAllByIdInBatch(longs);
    }

    @Override
    public void deleteAllInBatch() {
        hoaDonRepository.deleteAllInBatch();
    }

    @Override
    @Deprecated
    public HoaDon getOne(Long aLong) {
        return hoaDonRepository.getOne(aLong);
    }

    @Override
    @Deprecated
    public HoaDon getById(Long aLong) {
        return hoaDonRepository.getById(aLong);
    }

    @Override
    public HoaDon getReferenceById(Long aLong) {
        return hoaDonRepository.getReferenceById(aLong);
    }

    @Override
    public <S extends HoaDon> List<S> findAll(Example<S> example) {
        return hoaDonRepository.findAll(example);
    }

    @Override
    public <S extends HoaDon> List<S> findAll(Example<S> example, Sort sort) {
        return hoaDonRepository.findAll(example, sort);
    }

    @Override
    public <S extends HoaDon> List<S> saveAll(Iterable<S> entities) {
        return hoaDonRepository.saveAll(entities);
    }

    @Override
    public List<HoaDon> findAll() {
        return hoaDonRepository.findAll();
    }

    @Override
    public List<HoaDon> findAllById(Iterable<Long> longs) {
        return hoaDonRepository.findAllById(longs);
    }

    @Override
    public <S extends HoaDon> S save(S entity) {
        return hoaDonRepository.save(entity);
    }

    @Override
    public Optional<HoaDon> findById(Long aLong) {
        return hoaDonRepository.findById(aLong);
    }

    @Override
    public boolean existsById(Long aLong) {
        return hoaDonRepository.existsById(aLong);
    }

    @Override
    public long count() {
        return hoaDonRepository.count();
    }

    @Override
    public void deleteById(Long aLong) {
        hoaDonRepository.deleteById(aLong);
    }

    @Override
    public void delete(HoaDon entity) {
        hoaDonRepository.delete(entity);
    }

    @Override
    public void deleteAllById(Iterable<? extends Long> longs) {
        hoaDonRepository.deleteAllById(longs);
    }

    @Override
    public void deleteAll(Iterable<? extends HoaDon> entities) {
        hoaDonRepository.deleteAll(entities);
    }

    @Override
    public void deleteAll() {
        hoaDonRepository.deleteAll();
    }

    @Override
    public List<HoaDon> findAll(Sort sort) {
        return hoaDonRepository.findAll(sort);
    }

    @Override
    public Page<HoaDon> findAll(Pageable pageable) {
        return hoaDonRepository.findAll(pageable);
    }

    @Override
    public <S extends HoaDon> Optional<S> findOne(Example<S> example) {
        return hoaDonRepository.findOne(example);
    }

    @Override
    public <S extends HoaDon> Page<S> findAll(Example<S> example, Pageable pageable) {
        return hoaDonRepository.findAll(example, pageable);
    }

    @Override
    public <S extends HoaDon> long count(Example<S> example) {
        return hoaDonRepository.count(example);
    }

    @Override
    public <S extends HoaDon> boolean exists(Example<S> example) {
        return hoaDonRepository.exists(example);
    }

    @Override
    public <S extends HoaDon, R> R findBy(Example<S> example, Function<FluentQuery.FetchableFluentQuery<S>, R> queryFunction) {
        return hoaDonRepository.findBy(example, queryFunction);
    }

    @Override
    public List<Object[]> getSoLuongDonHangTheoThang(String uid) {
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusMonths(12);

        return hoaDonRepository.countDonHangTheoThang(uid, startDate, endDate);

    }

    @Override
    public List<Object[]> getSoLuongDonHangOflineTheoThang(String uid) {
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusMonths(12);

        return hoaDonRepository.countDonHangOfflineTheoThang(uid, startDate, endDate);

    }


}
