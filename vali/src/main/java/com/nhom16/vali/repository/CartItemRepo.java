package com.nhom16.vali.repository;

import com.nhom16.vali.entity.CartItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface CartItemRepo extends MongoRepository<CartItem, String> {
}
