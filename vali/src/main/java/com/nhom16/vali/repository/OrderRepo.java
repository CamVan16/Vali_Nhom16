package com.nhom16.vali.repository;

import com.nhom16.vali.entity.Order;
import java.util.Optional;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepo extends MongoRepository<Order, String> {
        Optional<List<Order>> findByUserId(String userId);

}
