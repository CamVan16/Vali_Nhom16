package com.nhom16.vali.service;

import com.nhom16.vali.entity.Order;
import com.nhom16.vali.entity.CartItem;
//import com.nhom16.vali.entity.Product;
import com.nhom16.vali.repository.OrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private ProductService productService;

    public Order createOrder(Order order) {
        Order savedOrder = orderRepo.save(order);
        updateProductStock(savedOrder.getCartItems());
        return savedOrder;
    }

    public Optional<Order> getOrderById(String id) {
        return orderRepo.findById(id);
    }
    public Optional<List<Order>> findByUserId(String userId) {
        return orderRepo.findByUserId(userId);
    }
    public List<Order> getAllOrders() {
        return orderRepo.findAll();
    }

    public void updateProductStock(List<CartItem> cartItems) {
        for (CartItem cartItem : cartItems) {
            String productId = cartItem.getProductId();
            Map<String, Map<String, Integer>> productStockMap = productService.getProductStock(productId);
            if (productStockMap != null) {
                String color = cartItem.getColor();
                String size = cartItem.getSize();
                Map<String, Integer> sizeStockMap = productStockMap.getOrDefault(color, null);
                if (sizeStockMap != null) {
                    Integer currentStock = sizeStockMap.getOrDefault(size, 0);
                    Integer updatedStock = currentStock - cartItem.getQuantity();
                    if (updatedStock < 0) {
                        throw new RuntimeException("Insufficient stock for product: " + productId);
                    }
                    sizeStockMap.put(size, updatedStock);
                    productService.saveOrUpdateProductStock(productId, color, size, sizeStockMap);
                } else {
                    throw new RuntimeException("Size stock map not found for color: " + color);
                }
            } else {
                throw new RuntimeException("Product stock map not found for product: " + productId);
            }
        }
    }

    public Order updatePaymentStatus(String orderId, String paymentStatus) {
        Optional<Order> optionalOrder = orderRepo.findById(orderId);
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            order.setPaymentStatus(paymentStatus);
            return orderRepo.save(order);
        } else {
            throw new RuntimeException("Order not found");
        }
    }
}
