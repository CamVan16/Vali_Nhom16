package com.nhom16.vali.service;

import com.nhom16.vali.entity.CartItem;
import com.nhom16.vali.repository.CartItemRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartItemService {
    @Autowired
    private CartItemRepo cartItemRepo;

    public void saveOrUpdate(CartItem cartItem) {
        cartItemRepo.save(cartItem);
    }

    public Iterable<CartItem> listAllCartItems() {
        return cartItemRepo.findAll();
    }

    public void deleteCartItemById(String id) {
        cartItemRepo.deleteById(id);
    }
}
