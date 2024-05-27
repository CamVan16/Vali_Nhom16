package com.nhom16.vali.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "users")
public class User {
    @Id
    private String _id;
    private String username;
    private String email;
    private List<Address> addresses;
    private String mobile;
    private String password;
    private boolean isAdmin;
    

    public User(String _id, String username, String email, List<Address> addresses, String mobile, String password, boolean isAdmin) {
        this._id = _id;
        this.username = username;
        this.email = email;
        this.addresses = addresses;
        this.mobile = mobile;
        this.password = password;
        this.isAdmin = isAdmin;
    }

    public User() {
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Address> getAddresses() {
        return addresses;
    }

    public void setAddresses(List<Address> addresses) {
        this.addresses = addresses;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    public boolean getIsAdmin() { 
        return isAdmin;
    }

    public void setIsAdmin(boolean isAdmin) { 
        this.isAdmin = isAdmin;
    }

    @Override
    public String toString() {
        return "User{" +
                "_id='" + _id + '\'' +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", addresses=" + addresses +
                ", mobile='" + mobile + '\'' +
                ", password='" + password + '\'' +
                ", isAdmin=" + isAdmin +
                '}';
    }
}
