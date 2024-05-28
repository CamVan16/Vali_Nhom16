package com.nhom16.vali.controller;

import com.nhom16.vali.entity.Order;
import com.nhom16.vali.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // tạo order
    @PostMapping(value = "/save")
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        try {
            Order createdOrder = orderService.createOrder(order);
            orderService.updateProductStock(order.getCartItems());
            return ResponseEntity.ok(createdOrder);
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).body(null);
        }
    }

    // lấy danh sách các order
    @GetMapping(value = "/getall")
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    // lấy order theo id
    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable String id) {
        return orderService.getOrderById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // lấy lịch sử order
    @GetMapping("/orderHis/{userId}")
    public ResponseEntity<List<Order>> getOrderByUserId(@PathVariable String userId) {
        return orderService.getOrderByUserId(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // xác nhận payment
    @PostMapping("/confirmPayment")
    public ResponseEntity<String> confirmPayment(@RequestParam Map<String, String> allParams) {
        String vnp_ResponseCode = allParams.get("vnp_ResponseCode");
        if ("00".equals(vnp_ResponseCode)) {
            // Payment thành công
            String orderId = allParams.get("vnp_TxnRef");
            Optional<Order> optionalOrder = orderService.getOrderById(orderId);
            if (optionalOrder.isPresent()) {
                Order order = optionalOrder.get();
                order.setPaymentStatus("Đã thanh toán");
                order.setShippingStatus("Chưa nhận hàng");
                orderService.createOrder(order);
                return ResponseEntity.ok("Payment confirmed and order saved.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order not found.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Payment failed.");
        }
    }

    // tạo order với vnpay
    @PostMapping("/createVNPAYOrder")
    public ResponseEntity<Order> createVNPAYOrder(@RequestBody Order order) {
        try {
            order.setPaymentStatus("Chờ thanh toán");
            order.setShippingStatus("Chưa nhận hàng");
            Order createdOrder = orderService.createOrder(order);
            return ResponseEntity.ok(createdOrder);
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).body(null);
        }
    }

    // cập nhật trạng thái
    @PostMapping("/updatePaymentStatus")
    public ResponseEntity<Void> updatePaymentStatus(@RequestBody Map<String, String> paymentStatusUpdate) {
        try {
            String orderId = paymentStatusUpdate.get("orderId");
            String paymentStatus = paymentStatusUpdate.get("paymentStatus");
            orderService.updatePaymentStatus(orderId, paymentStatus);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).build();
        }
    }

    // cập nhật các trạng thái của order
    @PutMapping("/update/{id}")
    public ResponseEntity<Order> updateOrder(@PathVariable String id, @RequestBody Order orderDetails) {
        Optional<Order> optionalOrder = orderService.getOrderById(id);
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            order.setPaymentStatus(orderDetails.getPaymentStatus());
            order.setShippingStatus(orderDetails.getShippingStatus());
            Order updatedOrder = orderService.createOrder(order);
            return ResponseEntity.ok(updatedOrder);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // xoá
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable String id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }
}
