package com.nhom16.vali.service;

import com.nhom16.vali.entity.User;
import com.nhom16.vali.entity.Address;
import com.nhom16.vali.repository.UserRepo;
//import com.nhom16.vali.util.EmailUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import org.bson.types.ObjectId;
//import jakarta.mail.MessagingException;

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

    @Autowired
    private JwtService jwtService;

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

    // public String forgotPassword(String email) {
    // User user = repo.findByEmail(email)
    // .orElseThrow(
    // () -> new RuntimeException("User not found with this email: " + email));
    // try{
    // EmailUtil.sendSetPasswordEmail(email);

    // } catch (MessagingException e){
    // throw new RuntimeException("Unable to send set password email, please try
    // again");
    // }
    // return "Please check your email to set new password";
    // }
}
