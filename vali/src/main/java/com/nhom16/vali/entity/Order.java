package com.nhom16.vali.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.*;

@Document(collection = "orders")
public class Order {
    // thành phần dữ liệu
    @Id
    private String id;
    private String userId;
    private ArrayList<CartItem> cartItems;
    private double totalPrice;
    private double shippingCost;
    private double orderTotal;
    private String shippingMethod;
    private String paymentMethod;
    private String shippingAddress;
    private String notes;
    private String shippingStatus;
    private String paymentStatus;
    private LocalDateTime createdAt;

    // thành phần phương thức

    public Order(String id, String userId, ArrayList<CartItem> cartItems, double totalPrice, double shippingCost,
            double orderTotal, String shippingMethod, String paymentMethod, String shippingAddress, String notes,
            String shippingStatus, String paymentStatus, LocalDateTime createdAt) {
        this.id = id;
        this.userId = userId;
        this.cartItems = cartItems;
        this.totalPrice = totalPrice;
        this.shippingCost = shippingCost;
        this.orderTotal = orderTotal;
        this.shippingMethod = shippingMethod;
        this.paymentMethod = paymentMethod;
        this.shippingAddress = shippingAddress;
        this.notes = notes;
        this.shippingStatus = shippingStatus;
        this.paymentStatus = paymentStatus;
        this.createdAt = createdAt;
    }

    public Order() {
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

    public List<CartItem> getCartItems() {
        return cartItems;
    }

    public void setCartItems(ArrayList<CartItem> cartItems) {
        this.cartItems = cartItems;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public double getShippingCost() {
        return shippingCost;
    }

    public void setShippingCost(double shippingCost) {
        this.shippingCost = shippingCost;
    }

    public double getOrderTotal() {
        return orderTotal;
    }

    public void setOrderTotal(double orderTotal) {
        this.orderTotal = orderTotal;
    }

    public String getShippingMethod() {
        return shippingMethod;
    }

    public void setShippingMethod(String shippingMethod) {
        this.shippingMethod = shippingMethod;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getShippingStatus() {
        return shippingStatus;
    }

    public void setShippingStatus(String shippingStatus) {
        this.shippingStatus = shippingStatus;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "Order{" +
                "id='" + id + '\'' +
                ", userId='" + userId + '\'' +
                ", cartItems=" + cartItems +
                ", totalPrice=" + totalPrice +
                ", shippingCost=" + shippingCost +
                ", orderTotal=" + orderTotal +
                ", shippingMethod='" + shippingMethod + '\'' +
                ", paymentMethod='" + paymentMethod + '\'' +
                ", shippingAddress='" + shippingAddress + '\'' +
                ", notes='" + notes + '\'' +
                ", shippingStatus='" + shippingStatus + '\'' +
                ", paymentStatus='" + paymentStatus + '\'' +
                ", createdAt='" + createdAt + '\'' +
                '}';
    }
}
