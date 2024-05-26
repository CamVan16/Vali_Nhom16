package com.nhom16.vali.controller;

import com.nhom16.vali.entity.User;
import com.nhom16.vali.service.JwtService;
import com.nhom16.vali.entity.Address;
import com.nhom16.vali.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
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
    private ResponseEntity<User> saveUser(@RequestBody User user) {
        userService.saveOrUpdate(user);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @GetMapping(value = "/getall")
    public Iterable<User> getUsers() {
        return userService.listAllUsers();
    }

    // @PostMapping(value = "/login")
    // public ResponseEntity<?> loginUser(@RequestBody Map<String, String>
    // loginData) {
    // String email = loginData.get("email");
    // String password = loginData.get("password");
    // Optional<User> userOptional = userService.authenticateUser(email, password);
    // if (userOptional.isPresent()) {
    // User user = userOptional.get();
    // return ResponseEntity.ok(user);
    // } else {
    // return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
    // .body("Đăng nhập thất bại. Vui lòng kiểm tra lại tên người dùng và mật
    // khẩu.");
    // }
    // }
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
    public ResponseEntity<User> getUserById(@PathVariable("id") String id) {
        Optional<User> userOptional = userService.getUserById(id);
        if (userOptional.isPresent()) {
            return ResponseEntity.ok(userOptional.get());
        } else {
            return ResponseEntity.notFound().build();
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

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<String> deleteUserById(@PathVariable("id") String id) {
        Optional<User> userOptional = userService.getUserById(id);
        if (userOptional.isPresent()) {
            userService.deleteUserById(id);
            return ResponseEntity.ok("Người dùng đã được xóa thành công");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // @PostMapping(value = "/addAddress/{userId}")
    // public ResponseEntity<User> addAddress(@PathVariable("userId") String userId,
    // @RequestBody Address address) {
    // Optional<User> userOptional = userService.getUserById(userId);
    // if (userOptional.isPresent()) {
    // User user = userOptional.get();
    // if (address.getId() == null || address.getId().isEmpty()) {
    // address.setId(new ObjectId().toString());
    // }
    // user.getAddresses().add(address);
    // userService.saveOrUpdate(user);
    // return ResponseEntity.ok(user);
    // } else {
    // return ResponseEntity.notFound().build();
    // }
    // }
    @PostMapping(value = "/addAddress/{userId}")
    public ResponseEntity<User> addAddress(@PathVariable("userId") String userId, @RequestBody Address address) {
        Optional<User> userOptional = userService.getUserById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (user.getAddresses() == null) {
                user.setAddresses(new ArrayList<>()); // Khởi tạo danh sách nếu chưa tồn tại
            }
            if (address.getId() == null || address.getId().isEmpty()) {
                address.setId(new ObjectId().toString()); // Set ID if null or empty
            }
            user.getAddresses().add(address); // Thêm địa chỉ mới vào danh sách
            userService.saveOrUpdate(user); // Lưu thông tin người dùng đã được cập nhật
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
            return ResponseEntity.notFound().build(); // Address not found
        } else {
            return ResponseEntity.notFound().build(); // User not found
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
            return ResponseEntity.notFound().build(); // User not found
        }
    }

    


    // @PutMapping("forgot-password")
    // public ResponseEntity<String> forgotPassword(@RequestParam String email) {
    //     return new ResponseEntity<>(userService.resetPassword(email), HttpStatus.OK);
    // }
    @PutMapping("forgot-password")
    public ResponseEntity<Map<String, String>> forgotPassword(@RequestParam String email) {
        return new ResponseEntity<>(userService.resetPassword(email), HttpStatus.OK);
    }

}
