package com.nhom16.vali.repository;

import com.nhom16.vali.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepo extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);

    Optional<User> findBy_id(String _id);
}
