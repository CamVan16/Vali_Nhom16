package com.nhom16.vali.service;

import com.nhom16.vali.entity.User;
import com.nhom16.vali.entity.Address;
import com.nhom16.vali.repository.UserRepo;
import com.nhom16.vali.util.EmailUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.security.SecureRandom;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

import org.bson.types.ObjectId;
import jakarta.mail.MessagingException;

@Service
public class UserService {
    @Autowired
    private UserRepo repo;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void saveOrUpdate(User user) {
        if (user.getAddresses() != null) {
            for (Address address : user.getAddresses()) {
                if (address.getId() == null || address.getId().isEmpty()) {
                    address.setId(new ObjectId().toString());
                }
            }
        }
        if (user.getPassword() != null) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
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

    public Optional<User> authenticateUser(String email, String password) {
        Optional<User> userOptional = repo.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // if (user.getPassword().equals(password)) {
            // return Optional.of(user);
            // }
            if (passwordEncoder.matches(password, user.getPassword())) {
                return Optional.of(user);
            }
        }
        return Optional.empty();
    }

    public Map<String, String> changePassword(String userId, String oldPassword, String newPassword,
            String confirmPassword) {
        User user = repo.findBy_id(userId)
                .orElseThrow(() -> new RuntimeException("User not found with this id: " + userId));
        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new RuntimeException("Old password is incorrect");
        }
        if (!newPassword.equals(confirmPassword)) {
            throw new RuntimeException("New passwords do not match");
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        repo.save(user);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Password changed successfully");
        return response;
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

    @Autowired
    private EmailUtil emailUtil;

    private String generateRandomPassword(int length) {
        final String chars = "@ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        Random random = new SecureRandom();
        StringBuilder password = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            password.append(chars.charAt(random.nextInt(chars.length())));
        }
        return password.toString();
    }

    public Map<String, String> resetPassword(String email) {
        User user = repo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with this email: " + email));
        String newPassword = generateRandomPassword(10);
        user.setPassword(passwordEncoder.encode(newPassword));
        repo.save(user);
        try {
            emailUtil.sendNewPasswordEmail(email, newPassword);
        } catch (MessagingException e) {
            throw new RuntimeException("Unable to send new password email, please try again");
        }
        Map<String, String> response = new HashMap<>();
        response.put("message", "New password sent to your email");
        return response;
    }

}
