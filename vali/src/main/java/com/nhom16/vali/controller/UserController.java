package com.nhom16.vali.controller;

import com.nhom16.vali.entity.User;
import com.nhom16.vali.service.JwtService;
import com.nhom16.vali.entity.Address;
import com.nhom16.vali.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import org.bson.types.ObjectId;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/v1/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping(value = "/save")
    public ResponseEntity<?> saveUser(@RequestBody User user) {
        Optional<User> emailOptional = userService.findByEmail(user.getEmail());
        if (emailOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Email đã tồn tại, vui lòng nhập email khác");
        }
        {
            userService.saveOrUpdate(user);
            return new ResponseEntity<>(user, HttpStatus.CREATED);
        }

    }

    @GetMapping(value = "/getall")
    public Iterable<User> getUsers() {
        return userService.listAllUsers();
    }

    @Autowired
    private JwtService JwtService;

    @PostMapping(value = "/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");
        Optional<User> userOptional = userService.authenticateUser(email, password);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Đăng nhập thất bại. Vui lòng kiểm tra lại tên người dùng và mật khẩu.");
        }
    }

    @GetMapping(value = "/getById/{id}")
    public ResponseEntity<?> getUserById(@PathVariable("id") String id) {
        Optional<User> userOptional = userService.getUserById(id);
        if (userOptional.isPresent()) {
            return ResponseEntity.ok(userOptional.get());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Tài khoản không tồn tại");

        }
    }

    @PutMapping(value = "/update/{id}")
    public ResponseEntity<User> updateUserById(@PathVariable("id") String id, @RequestBody User updatedUser) {
        Optional<User> userOptional = userService.getUserById(id);
        if (userOptional.isPresent()) {
            User existingUser = userOptional.get();
            existingUser.setUsername(updatedUser.getUsername());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setMobile(updatedUser.getMobile());
            existingUser.setPassword(updatedUser.getPassword());

            if (existingUser.getAddresses() != null && !existingUser.getAddresses().isEmpty()) {
                existingUser.getAddresses().get(0).setAddress(updatedUser.getAddresses().get(0).getAddress());
            } else {
                existingUser.setAddresses(updatedUser.getAddresses());
            }

            userService.saveOrUpdate(existingUser);
            return ResponseEntity.ok(existingUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/change-password/{userId}")
    public ResponseEntity<Map<String, String>> changePassword(
            @PathVariable("userId") String userId,
            @RequestBody Map<String, String> passwordData) {
        String oldPassword = passwordData.get("oldPassword");
        String newPassword = passwordData.get("newPassword");
        String confirmPassword = passwordData.get("confirmPassword");
        return new ResponseEntity<>(userService.changePassword(userId, oldPassword, newPassword, confirmPassword),
                HttpStatus.OK);
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<String> deleteUserById(@PathVariable("id") String id) {
        Optional<User> userOptional = userService.getUserById(id);
        if (userOptional.isPresent()) {
            userService.deleteUserById(id);
            return ResponseEntity.ok("Người dùng đã được xóa thành công");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Tài khoản không tồn tại");
        }
    }

    @PostMapping(value = "/addAddress/{userId}")
    public ResponseEntity<User> addAddress(@PathVariable("userId") String userId, @RequestBody Address address) {
        Optional<User> userOptional = userService.getUserById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (user.getAddresses() == null) {
                user.setAddresses(new ArrayList<>());
            }
            if (address.getId() == null || address.getId().isEmpty()) {
                address.setId(new ObjectId().toString());
            }
            user.getAddresses().add(address);
            userService.saveOrUpdate(user);
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping(value = "/updateAddress/{userId}/{addressId}")
    public ResponseEntity<User> updateAddress(@PathVariable("userId") String userId,
            @PathVariable("addressId") String addressId, @RequestBody Address updatedAddress) {
        Optional<User> userOptional = userService.getUserById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            for (Address address : user.getAddresses()) {
                if (address.getId().equals(addressId)) {
                    address.setAddress(updatedAddress.getAddress());
                    address.setMobile(updatedAddress.getMobile());
                    userService.saveOrUpdate(user);
                    return ResponseEntity.ok(user);
                }
            }
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping(value = "/deleteAddress/{userId}/{addressId}")
    public ResponseEntity<User> deleteAddress(@PathVariable("userId") String userId,
            @PathVariable("addressId") String addressId) {
        Optional<User> userOptional = userService.getUserById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.getAddresses().removeIf(address -> address.getId().equals(addressId));
            userService.saveOrUpdate(user);
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("forgot-password")
    public ResponseEntity<Map<String, String>> forgotPassword(@RequestParam String email) {
        return new ResponseEntity<>(userService.resetPassword(email), HttpStatus.OK);
    }
}
