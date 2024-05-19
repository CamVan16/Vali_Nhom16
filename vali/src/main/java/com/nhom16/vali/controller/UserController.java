package com.nhom16.vali.controller;

import com.nhom16.vali.entity.User;
import com.nhom16.vali.service.JwtService;
import com.nhom16.vali.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import java.util.Optional;
import java.util.Map;
import java.util.*;
import org.bson.types.ObjectId;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/v1/user")
public class UserController {
    @Autowired
    private UserService userService;

    // @PostMapping(value = "/save")
    // private ResponseEntity<User> saveUser(@RequestBody User user) {
    // userService.saveOrUpdate(user);
    // return new ResponseEntity<>(user, HttpStatus.CREATED);
    // }

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
            existingUser.setAddress(updatedUser.getAddress());
            existingUser.setMobile(updatedUser.getMobile());
            userService.saveOrUpdate(existingUser); 

            return ResponseEntity.ok(existingUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // @PutMapping(value = "/changePassword/{id}")
    // public ResponseEntity<String> changePassword(@PathVariable("id") String id,
    // @RequestBody Map<String, String> passwordData) {
    // String currentPassword = passwordData.get("currentPassword");
    // String newPassword = passwordData.get("newPassword");
    // String confirmPassword = passwordData.get("confirmPassword");

    // // Validate required fields
    // if (currentPassword == null || newPassword == null || confirmPassword ==
    // null) {
    // return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The input is
    // required");
    // }

    // // Validate password match
    // if (!newPassword.equals(confirmPassword)) {
    // return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The password does
    // not match confirmPassword");
    // }

    // // Retrieve user by id
    // Optional<User> userOptional = userService.getUserById(id);
    // if (userOptional.isPresent()) {
    // User user = userOptional.get();

    // // Check if current password matches
    // if (!user.getPassword().equals(currentPassword)) {
    // return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Mật khẩu hiện tại
    // không đúng");
    // }

    // // Update password
    // user.setPassword(newPassword);
    // userService.saveOrUpdate(user);

    // return ResponseEntity.ok("Thay đổi mật khẩu thành công");
    // } else {
    // return ResponseEntity.notFound().build();
    // }
    // }
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
}
