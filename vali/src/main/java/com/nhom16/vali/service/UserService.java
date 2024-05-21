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

    @Autowired
    private JwtService jwtService;

    // public boolean authenticateUser(String mail, String password) {
    // Optional<User> userOptional = repo.findByEmail(mail);
    // if (userOptional.isPresent()) {
    // User user = userOptional.get();
    // if (user.getPassword().equals(password)) {
    // // Đăng nhập thành công, tạo và lưu token vào người dùng
    // String access_token = jwtService.generateAccessToken(user.get_id());
    // String refresh_token = jwtService.generateRefreshToken(user.get_id());
    // user.setAccess_token(access_token);
    // user.setRefresh_token(refresh_token);
    // repo.save(user); // Lưu người dùng đã được cập nhật với token mới
    // return Optional.of(user);
    // }
    // }
    // return false;
    // }
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

    public Optional<User> findByUsername(String username) {
        return repo.findByUsername(username);
    }

    public Optional<User> findByEmail(String email) {
        return repo.findByEmail(email);
    }

    public String forgotPassword (String email){
        User user = repo.findByEmail(email)
            .orElseThrow(
                () -> new RuntimeException("User not found with this email: "+ email)
            );
        return null;    
    }
}
