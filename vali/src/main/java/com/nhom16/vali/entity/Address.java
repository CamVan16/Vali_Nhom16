package com.nhom16.vali.entity;

import org.bson.types.ObjectId;

public class Address {
    // thành phần dữ liệu
    private String id;
    private String name;
    private String address;
    private String mobile;

    // thành phần phương thức
    public Address(String id, String name, String address, String mobile) {
        this.id = id != null ? id : new ObjectId().toString();
        this.name = name;
        this.address = address;
        this.mobile = mobile;
    }

    public Address() {
        this.id = new ObjectId().toString();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id != null ? id : new ObjectId().toString();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    @Override
    public String toString() {
        return "Address{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", address='" + address + '\'' +
                ", mobile='" + mobile + '\'' +
                '}';
    }
}
