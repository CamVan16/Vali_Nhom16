package com.nhom16.vali.service;

import com.nhom16.vali.entity.User;
import com.nhom16.vali.entity.Address;
import com.nhom16.vali.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import org.bson.types.ObjectId;

@Service
public class UserService {
    @Autowired
    private UserRepo repo;

    public void saveOrUpdate(User user) {
        if (user.getAddresses() != null) {
            for (Address address : user.getAddresses()) {
                if (address.getId() == null || address.getId().isEmpty()) {
                    address.setId(new ObjectId().toString()); // Set ID if null or empty
                }
            }
        }
        repo.save(user);
    }

    public Iterable<User> listAllUsers() {
        return repo.findAll();
    }

    public Optional<User> getUserById(String _id) {
        return repo.findBy_id(_id);
    }

    public Optional<User> authenticateUser(String email, String password) {
        Optional<User> userOptional = repo.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (user.getPassword().equals(password)) {
                return Optional.of(user);
            }
        }
        return Optional.empty();
    }

    public void deleteUserById(String id) {
        repo.deleteById(id);
    }
}
