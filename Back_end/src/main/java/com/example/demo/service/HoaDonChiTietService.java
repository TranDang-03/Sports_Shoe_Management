package com.example.demo.service;

import com.example.demo.entity.HoaDonChiTiet;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.FluentQuery;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

public interface HoaDonChiTietService {

    List<HoaDonChiTiet> getAll(String idHD);

    List<HoaDonChiTiet> get(Long idHD, Long idHDCT);

    void flush();

    <S extends HoaDonChiTiet> S saveAndFlush(S entity);

    <S extends HoaDonChiTiet> List<S> saveAllAndFlush(Iterable<S> entities);

    @Deprecated
    void deleteInBatch(Iterable<HoaDonChiTiet> entities);

    void deleteAllInBatch(Iterable<HoaDonChiTiet> entities);

    void deleteAllByIdInBatch(Iterable<Long> longs);

    void deleteAllInBatch();

    @Deprecated
    HoaDonChiTiet getOne(Long aLong);

    @Deprecated
    HoaDonChiTiet getById(Long aLong);

    HoaDonChiTiet getReferenceById(Long aLong);

    <S extends HoaDonChiTiet> List<S> findAll(Example<S> example);

    <S extends HoaDonChiTiet> List<S> findAll(Example<S> example, Sort sort);

    <S extends HoaDonChiTiet> List<S> saveAll(Iterable<S> entities);

    List<HoaDonChiTiet> findAll();

    List<HoaDonChiTiet> findAllById(Iterable<Long> longs);

    <S extends HoaDonChiTiet> S save(S entity);

    Optional<HoaDonChiTiet> findById(Long aLong);

    boolean existsById(Long aLong);

    long count();

    void deleteById(Long aLong);

    void delete(HoaDonChiTiet entity);

    void deleteAllById(Iterable<? extends Long> longs);

    void deleteAll(Iterable<? extends HoaDonChiTiet> entities);

    void deleteAll();

    List<HoaDonChiTiet> findAll(Sort sort);

    Page<HoaDonChiTiet> findAll(Pageable pageable);

    <S extends HoaDonChiTiet> Optional<S> findOne(Example<S> example);

    <S extends HoaDonChiTiet> Page<S> findAll(Example<S> example, Pageable pageable);

    <S extends HoaDonChiTiet> long count(Example<S> example);

    <S extends HoaDonChiTiet> boolean exists(Example<S> example);

    <S extends HoaDonChiTiet, R> R findBy(Example<S> example, Function<FluentQuery.FetchableFluentQuery<S>, R> queryFunction);
}
