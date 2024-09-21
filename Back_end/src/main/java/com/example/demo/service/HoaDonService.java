package com.example.demo.service;

import com.example.demo.entity.HoaDon;
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
public interface HoaDonService {
    List<HoaDon> getAll(String idKH);

    <S extends HoaDon> S saveAndFlush(S entity);

    <S extends HoaDon> List<S> saveAllAndFlush(Iterable<S> entities);

    @Deprecated
    void deleteInBatch(Iterable<HoaDon> entities);

    void deleteAllInBatch(Iterable<HoaDon> entities);

    void deleteAllByIdInBatch(Iterable<Long> longs);

    void deleteAllInBatch();

    @Deprecated
    HoaDon getOne(Long aLong);

    @Deprecated
    HoaDon getById(Long aLong);

    HoaDon getReferenceById(Long aLong);

    <S extends HoaDon> List<S> findAll(Example<S> example);

    <S extends HoaDon> List<S> findAll(Example<S> example, Sort sort);

    <S extends HoaDon> List<S> saveAll(Iterable<S> entities);

    List<HoaDon> findAll();

    List<HoaDon> findAllById(Iterable<Long> longs);

    <S extends HoaDon> S save(S entity);

    Optional<HoaDon> findById(Long aLong);

    boolean existsById(Long aLong);

    long count();

    void deleteById(Long aLong);

    void delete(HoaDon entity);

    void deleteAllById(Iterable<? extends Long> longs);

    void deleteAll(Iterable<? extends HoaDon> entities);

    void deleteAll();

    List<HoaDon> findAll(Sort sort);

    Page<HoaDon> findAll(Pageable pageable);

    <S extends HoaDon> Optional<S> findOne(Example<S> example);

    <S extends HoaDon> Page<S> findAll(Example<S> example, Pageable pageable);

    <S extends HoaDon> long count(Example<S> example);

    <S extends HoaDon> boolean exists(Example<S> example);

    <S extends HoaDon, R> R findBy(Example<S> example, Function<FluentQuery.FetchableFluentQuery<S>, R> queryFunction);


    List<Object[]> getSoLuongDonHangTheoThang(String uid);
    List<Object[]> getSoLuongDonHangOflineTheoThang(String uid);
}
