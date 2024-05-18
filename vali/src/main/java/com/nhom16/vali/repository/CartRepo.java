package com.nhom16.vali.repository;

import com.nhom16.vali.entity.Cart;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepo extends MongoRepository<Cart, String> {
    Optional<Cart> findByUserId(String userId);
}
