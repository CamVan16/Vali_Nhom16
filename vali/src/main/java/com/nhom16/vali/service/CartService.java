package com.nhom16.vali.service;

import com.nhom16.vali.entity.Cart;
import com.nhom16.vali.repository.CartRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartService {
    @Autowired
    private CartRepo cartRepo;

    public void saveOrUpdate(Cart cart) {
        cartRepo.save(cart);
    }

    public Optional<Cart> getCartByUserId(String userId) {
        return cartRepo.findByUserId(userId);
    }

    public void deleteCartById(String id) {
        cartRepo.deleteById(id);
    }
}
