package com.nhom16.vali.repository;

import com.nhom16.vali.entity.OrderDetail;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

//import java.util.List;
import java.util.Optional;

@Repository
public interface OrderDetailRepo extends MongoRepository<OrderDetail, String> {
    Optional<OrderDetail> findById(String _id);
    // List<OrderDetail> findByUserInfo_Id(String userId);
}
