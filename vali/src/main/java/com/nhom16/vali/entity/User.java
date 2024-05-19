package com.nhom16.vali.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {
    @Id
    private String _id;
    private String username;
    private String email;
    private String address;
    private String mobile;
    private String password;
    private String access_token;
    private String refresh_token;

    public User(String _id, String username, String email, String address, String mobile, String password) {
        this._id = _id;
        this.username = username;
        this.email = email;
        this.address = address;
        this.mobile = mobile;
        this.password = password;
        this.access_token = access_token;
        this.refresh_token = refresh_token;
    }

    public User() {
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }
    public String getAccess_token() {
        return access_token;
    }
    public String getRefresh_token() {
        return refresh_token;
    }
    public void setAccess_token(String access_token) {
        this.access_token = access_token;
    }
    public void setRefresh_token(String refresh_token) {
        this.refresh_token = refresh_token;
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
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

    @Override
    public String toString() {
        return "User{" +
                "_id='" + _id + '\'' +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", address='" + address + '\'' +
                ", mobile='" + mobile + '\'' +
                ", password='" + password + '\'' +
                ", access_token='" + access_token + '\''+
                ", refresh_token='" + refresh_token+ '\''+
                '}';
    }
}
