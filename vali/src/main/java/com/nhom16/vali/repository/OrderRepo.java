package com.nhom16.vali.repository;

import com.nhom16.vali.entity.Order;
import com.nhom16.vali.entity.User;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderRepo extends MongoRepository<Order, String> {
        List<Order> findByUserId(String userId);

}
