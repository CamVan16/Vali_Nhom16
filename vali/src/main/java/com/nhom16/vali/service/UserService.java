package com.nhom16.vali.service;

import com.nhom16.vali.entity.User;
import com.nhom16.vali.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepo repo;

    public void saveOrUpdate(User user) {
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
