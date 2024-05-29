package com.nhom16.vali.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Document(collection = "carts")
public class Cart {
    // thành phần dữ liệu
    @Id
    private String id;
    private String userId;
    private ArrayList<CartItem> items = new ArrayList<>();

    // thành phần phương thức
    public Cart(String id, String userId, ArrayList<CartItem> items) {
        this.id = id;
        this.userId = userId;
        this.items = items != null ? items : new ArrayList<>();
    }

    public Cart() {
        this.items = new ArrayList<>();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public ArrayList<CartItem> getItems() {
        return items;
    }

    public void setItems(ArrayList<CartItem> items) {
        this.items = items;
    }
}
