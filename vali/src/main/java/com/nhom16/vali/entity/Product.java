package com.nhom16.vali.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;

@Document(collection = "products")
public class Product {
    @Id
    private String id;
    private String name;
    private String type;
    private Map<String, String> img;
    private Map<String, Double> price;
    private int discount;
    private int stock;
    private Description description;

    public Product(String id, String name, String type, Map<String, String> img,
            Map<String, Double> price, int discount, int stock, Description description) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.img = img;
        this.price = price;
        this.discount = discount;
        this.stock = stock;
        this.description = description;
    }

    public Product() {
    }

    // Getters and Setters
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Map<String, String> getImg() {
        return img;
    }

    public void setImg(Map<String, String> img) {
        this.img = img;
    }

    public Map<String, Double> getPrice() {
        return price;
    }

    public void setPrice(Map<String, Double> price) {
        this.price = price;
    }

    public int getDiscount() {
        return discount;
    }

    public void setDiscount(int discount) {
        this.discount = discount;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public Description getDescription() {
        return description;
    }

    public void setDescription(Description description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "Product{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", type='" + type + '\'' +
                ", img=" + img +
                ", price=" + price +
                ", discount=" + discount +
                ", stock=" + stock +
                ", description=" + description +
                '}';
    }
}
