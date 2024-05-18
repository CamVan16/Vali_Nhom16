package com.nhom16.vali.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;
import java.util.List;
//import com.nhom16.vali.entity.User;

@Document(collection = "orderdetails")
public class OrderDetail {
    @Id
    private String _id;
    private List<OrderItem> orderItems;
    private ShippingAddress shippingAddress;
    private String paymentMethod;
    private double itemsPrice;
    private double shippingPrice;
    private double totalPrice;
    private User userInfo;
    private boolean isPaid;
    private Date paidAt;
    private boolean isDelivered;
    private Date deliveredAt;

    public static class OrderItem {
        private int idProduct;
        private String name;
        private int amount;
        private String img;
        private double price;
        private Double discount;
        // private String product;

        public OrderItem() {
        }

        public OrderItem(int idProduct, String name, int amount, String img, double price, Double discount) {
            this.idProduct = idProduct;
            this.name = name;
            this.amount = amount;
            this.img = img;
            this.price = price;
            this.discount = discount;
        }

        public int getIdProduct() {
            return idProduct;
        }

        public void setIdProduct(int idProduct) {
            this.idProduct = idProduct;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public int getAmount() {
            return amount;
        }

        public void setAmount(int amount) {
            this.amount = amount;
        }

        public String getImg() {
            return img;
        }

        public void setImg(String img) {
            this.img = img;
        }

        public double getPrice() {
            return price;
        }

        public void setPrice(double price) {
            this.price = price;
        }

        public Double getDiscount() {
            return discount;
        }

        public void setDiscount(Double discount) {
            this.discount = discount;
        }

    }

    public static class ShippingAddress {
        private String fullName;
        private String address;
        private String phone;

        public ShippingAddress() {
        }

        public ShippingAddress(String fullName, String address, String phone) {
            this.fullName = fullName;
            this.address = address;
            this.phone = phone;
        }

        public String getFullName() {
            return fullName;
        }

        public void setFullName(String fullName) {
            this.fullName = fullName;
        }

        public String getAddress() {
            return address;
        }

        public void setAddress(String address) {
            this.address = address;
        }

        public String getPhone() {
            return phone;
        }

        public void setPhone(String phone) {
            this.phone = phone;
        }

    }

    public OrderDetail() {
    }

    public OrderDetail(String _id, List<OrderItem> orderItems, ShippingAddress shippingAddress, String paymentMethod,
            double itemsPrice, double shippingPrice, double totalPrice, User userInfo, boolean isPaid, Date paidAt,
            boolean isDelivered, Date deliveredAt) {
        this._id = _id;
        this.orderItems = orderItems;
        this.shippingAddress = shippingAddress;
        this.paymentMethod = paymentMethod;
        this.itemsPrice = itemsPrice;
        this.shippingPrice = shippingPrice;
        this.totalPrice = totalPrice;
        this.userInfo = userInfo;
        this.isPaid = isPaid;
        this.paidAt = paidAt;
        this.isDelivered = isDelivered;
        this.deliveredAt = deliveredAt;
    }

    public String get_id() {
        return _id;
    }

    public void set_Id(String _id) {
        this._id = _id;
    }

    public List<OrderItem> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }

    public ShippingAddress getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(ShippingAddress shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public double getItemsPrice() {
        return itemsPrice;
    }

    public void setItemsPrice(double itemsPrice) {
        this.itemsPrice = itemsPrice;
    }

    public double getShippingPrice() {
        return shippingPrice;
    }

    public void setShippingPrice(double shippingPrice) {
        this.shippingPrice = shippingPrice;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public User getUserInfo() {
        return userInfo;
    }

    public void setUserInfo(User userInfo) {
        this.userInfo = userInfo;
    }

    public boolean isPaid() {
        return isPaid;
    }

    public void setPaid(boolean paid) {
        isPaid = paid;
    }

    public Date getPaidAt() {
        return paidAt;
    }

    public void setPaidAt(Date paidAt) {
        this.paidAt = paidAt;
    }

    public boolean isDelivered() {
        return isDelivered;
    }

    public void setDelivered(boolean delivered) {
        isDelivered = delivered;
    }

    public Date getDeliveredAt() {
        return deliveredAt;
    }

    public void setDeliveredAt(Date deliveredAt) {
        this.deliveredAt = deliveredAt;
    }

    @Override
    public String toString() {
        return "OrderDetail{" +
                "_id='" + _id + '\'' +
                ", orderItems=" + orderItems +
                ", shippingAddress=" + shippingAddress +
                ", paymentMethod='" + paymentMethod + '\'' +
                // ", shipmentMethod='" + shipmentMethod + '\'' +
                ", itemsPrice=" + itemsPrice +
                ", shippingPrice=" + shippingPrice +
                ", totalPrice=" + totalPrice +
                ", userInfo='" + userInfo + '\'' +
                ", isPaid=" + isPaid +
                ", paidAt=" + paidAt +
                ", isDelivered=" + isDelivered +
                ", deliveredAt=" + deliveredAt +
                '}';
    }

}
