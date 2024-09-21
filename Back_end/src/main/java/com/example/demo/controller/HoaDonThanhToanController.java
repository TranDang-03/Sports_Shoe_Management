package com.example.demo.controller;

import com.example.demo.service.HoaDonThanhToanService;
import com.example.demo.dto.HoaDonThanhToanDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/payment-bill")
@AllArgsConstructor

@Tag(
        name = "CRUD REST API FOR PAYMENT-BILL RESOURCES",
        description = "CRUD REST API'S = CREATE, READ, UPDATE, DELETE"
)
@CrossOrigin(origins = "http://localhost:3000")
public class HoaDonThanhToanController {
    private HoaDonThanhToanService service;

    @Operation(
            summary = "Create a payment bill REST API",
            description = "CREATE A PAYMENT BILL FROM DATABASE"
    )
    @ApiResponse(
            responseCode = "201",
            description = "HTTP Status CREATED"
    )
    @PostMapping("/create")
    public ResponseEntity<?> createPaymentBill(@RequestBody HoaDonThanhToanDto hoaDonThanhToanDto) {
        System.out.println(hoaDonThanhToanDto.toString());
        return new ResponseEntity<>(service.createPaymentBill(hoaDonThanhToanDto), HttpStatus.OK);
    }

    @Operation(
            summary = "Update a payment bill REST API",
            description = "UPDATE A PAYMENT BILL FROM DATABASE"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status UPDATED"
    )
    @PutMapping("/edit/{id}")
    public ResponseEntity<?> editPaymentBill(@RequestBody HoaDonThanhToanDto hoaDonThanhToanDto, @PathVariable("id")Long id) {
        return new ResponseEntity<>(service.editPaymentBill(hoaDonThanhToanDto, id), HttpStatus.OK);
    }

    @Operation(
            summary = "Delete a payment bill REST API",
            description = "DELETE A PAYMENT BILL FROM DATABASE"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status DELETED"
    )
    @PutMapping("/delete/{id}")
    public ResponseEntity<?> deletePaymentBill(@PathVariable("id")Long id) {
        service.deletePaymentBill(id);
        return new ResponseEntity<>("Payment bill deleted successfully", HttpStatus.OK);
    }

    @Operation(
            summary = "Get all payment bill from bill REST API",
            description = "CREATE ALL PAYMENT BILL WITH BILL FROM DATABASE"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status FOUNDED"
    )
    @GetMapping("/bill/{id}")
    public ResponseEntity<?> getAllPaymentBillByBill(@PathVariable("id")Long billId){
        List<HoaDonThanhToanDto> listHoaDonThanhToan = service.getAllByHoaDon(billId);
        return new ResponseEntity<>(listHoaDonThanhToan, HttpStatus.OK);
    }

    @Operation(
            summary = "Get all payment bill from payment REST API",
            description = "CREATE ALL PAYMENT BILL WITH PAYMENT FROM DATABASE"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status FOUNDED"
    )
    @GetMapping("/payment/{id}")
    public ResponseEntity<?> getAllPaymentBillByPayment(@PathVariable("id")Long paymentId){
        List<HoaDonThanhToanDto> listHoaDonThanhToan = service.getAllByHoaDon(paymentId);
        return new ResponseEntity<>(listHoaDonThanhToan, HttpStatus.OK);
    }
}
