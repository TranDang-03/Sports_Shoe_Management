package com.example.demo.controller;

import com.example.demo.service.ThanhToanService;
import com.example.demo.dto.ThanhToanDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("payment")
@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
@Tag(
        name = "CRUD REST API FOR PAYMENTS RESOURCES",
        description = "CRUD REST API'S = CREATE, READ, UPDATE, DELETE"
)
public class ThanhToanController {
    private ThanhToanService service;

    @Operation(
            summary = "Create a payment REST API",
            description = "CREATE A PAYMENT FROM DATABASE"
    )
    @ApiResponse(
            responseCode = "201",
            description = "HTTP Status CREATED"
    )
    @PostMapping("/create")
    public ResponseEntity<?> createPayment(@RequestBody ThanhToanDto thanhToanDto) {
        return new ResponseEntity<>(service.createPayment(thanhToanDto), HttpStatus.OK);
    }



    @Operation(
            summary = "Get all payment REST API",
            description = "GET ALL PAYMENT FROM DATABASE"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status FOUNDED"
    )
    @GetMapping("/get-all")
    public ResponseEntity<?> getAllPayment() {
        return new ResponseEntity<>(service.getAllThanhToan(), HttpStatus.OK);
    }

    @Operation(
            summary = "Get payment by ID REST API",
            description = "GET PAYMENT BY ID FROM DATABASE"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status FOUNDED"
    )
    @GetMapping("/get/{id}")
    public ResponseEntity<?> getPaymentByid(@PathVariable("id") Long paymentId) {
        ThanhToanDto thanhToanDto = service.getById(paymentId);
        return new ResponseEntity<>(thanhToanDto, HttpStatus.OK);
    }
}
