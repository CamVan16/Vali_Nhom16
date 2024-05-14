package com.nhom16.vali.controller;

import com.nhom16.vali.entity.OrderDetail;
import com.nhom16.vali.service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@RestController
@CrossOrigin(origins = "*")

@RequestMapping("/api/v1/orderdetails")
public class OrderDetailController {

    @Autowired
    private OrderDetailService orderDetailService;

    @PostMapping("/create")
    public String createOrderDetail(@RequestBody OrderDetail orderDetail) {
        orderDetailService.createOrder(orderDetail);
        return orderDetail.get_id();
    }

    @GetMapping("/getAll")
    public List<OrderDetail> getAllOrders() {
        return orderDetailService.getAllOrders();
    }

    @GetMapping("getDetail/{id}")
    public ResponseEntity<OrderDetail> getOrderById(@PathVariable("id") String id) {
        Optional<OrderDetail> orderDetail = orderDetailService.getOrderById(id);
        if (orderDetail.isPresent()) {
            return ResponseEntity.ok(orderDetail.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // @GetMapping("/OrderHis/{userId}")
    // public ResponseEntity<List<OrderDetail>> getOrdersByUserInfo(@PathVariable("userId") String userId) {
    //     List<OrderDetail> orders = orderDetailService.getOrdersByUserInfo(userId);
    //     return ResponseEntity.ok(orders);
    // }
}
