package com.nhom16.vali.repository;

import com.nhom16.vali.entity.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepo extends MongoRepository<Product, String> {

}
