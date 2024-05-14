package com.nhom16.vali.service;

import com.nhom16.vali.entity.OrderDetail;

import com.nhom16.vali.repository.OrderDetailRepo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
@Service
public class OrderDetailService {
    @Autowired
    private OrderDetailRepo orderDetailRepo;

    public OrderDetail createOrder(OrderDetail orderDetail) {
        return orderDetailRepo.save(orderDetail);
    }

    public List<OrderDetail> getAllOrders() {
        return orderDetailRepo.findAll();
    }

    public Optional<OrderDetail> getOrderById(String id) {
        return orderDetailRepo.findById(id);
    }

    // public List<OrderDetail> getOrdersByUserInfo(String userId) {
    //     return orderDetailRepo.findByUserInfo_Id(userId);
    // }
}
