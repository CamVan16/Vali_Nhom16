// package com.nhom16.vali.controller;

// import com.nhom16.vali.entity.Order;
// import com.nhom16.vali.service.OrderService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;

// @RestController
// @CrossOrigin(origins = "*")
// @RequestMapping("/api/v1/order")
// public class OrderController {

//     @Autowired
//     private OrderService orderService;

//     @PostMapping(value = "/save")
//     public ResponseEntity<Order> createOrder(@RequestBody Order order) {
//         Order createdOrder = orderService.createOrder(order);
//         return ResponseEntity.ok(createdOrder);
//     }

//     @GetMapping(value = "/getall")
//     public ResponseEntity<List<Order>> getAllOrders() {
//         List<Order> orders = orderService.getAllOrders();
//         return ResponseEntity.ok(orders);
//     }

//     @GetMapping("/{id}")
//     public ResponseEntity<Order> getOrderById(@PathVariable String id) {
//         return orderService.getOrderById(id)
//                 .map(ResponseEntity::ok)
//                 .orElse(ResponseEntity.notFound().build());
//     }
// }
package com.nhom16.vali.controller;

import com.nhom16.vali.entity.Order;
import com.nhom16.vali.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

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

    @GetMapping(value = "/getall")
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable String id) {
        return orderService.getOrderById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
