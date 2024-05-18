package com.nhom16.vali.entity;

public class Address {
    private String id;
    private String name;
    private String address;
    private String mobile;

    public Address(String id, String name, String address, String mobile) {

        this.id = id;
        this.name = name;
        this.address = address;
        this.mobile = mobile;
    }

    public Address() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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
                "name='" + name + '\'' +
                "address='" + address + '\'' +
                ", mobile='" + mobile + '\'' +
                '}';
    }
}