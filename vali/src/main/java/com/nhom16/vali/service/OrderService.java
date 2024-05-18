package com.nhom16.vali.service;

import com.nhom16.vali.entity.Order;
import com.nhom16.vali.repository.OrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepo orderRepo;

    public Order createOrder(Order order) {
        return orderRepo.save(order);
    }

    public Optional<Order> getOrderById(String id) {
        return orderRepo.findById(id);
    }

    public List<Order> getAllOrders() {
        return orderRepo.findAll();
    }
}
