package com.nhom16.vali.controller;

import com.nhom16.vali.entity.Cart;
import com.nhom16.vali.entity.CartItem;
import com.nhom16.vali.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.ArrayList;
import java.util.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/v1/cart")
public class CartController {
    @Autowired
    private CartService cartService;

    // thêm sản phẩm vào cart của user
    @PostMapping(value = "/{userId}/add")
    public ResponseEntity<?> addItemToCart(@PathVariable String userId, @RequestBody CartItem cartItem) {
        Optional<Cart> cartOptional = cartService.getCartByUserId(userId);

        boolean itemExists = false; // kiểm tra trạng thái tồn tại của mục

        if (cartOptional.isPresent()) {
            Cart cart = cartOptional.get();
            if (cart.getItems() == null) {
                cart.setItems(new ArrayList<>());
            }

            for (CartItem item : cart.getItems()) {
                if (item.getProductId().equals(cartItem.getProductId()) &&
                        item.getColor().equals(cartItem.getColor()) &&
                        item.getSize().equals(cartItem.getSize())) {
                    item.setQuantity(item.getQuantity() + cartItem.getQuantity());
                    itemExists = true;
                    break;
                }
            }

            if (!itemExists) {
                cart.getItems().add(cartItem);
            }

            cartService.saveOrUpdate(cart);
            return ResponseEntity.ok(itemExists);
        } else {
            Cart cart = new Cart();
            cart.setUserId(userId);
            cart.setItems(new ArrayList<>());
            cart.getItems().add(cartItem);
            cartService.saveOrUpdate(cart);
            return ResponseEntity.status(HttpStatus.CREATED).body(false);
        }
    }

    // lấy giỏ hàng
    @GetMapping(value = "/{userId}")
    public ResponseEntity<Cart> getCartByUserId(@PathVariable String userId) {
        Optional<Cart> cartOptional = cartService.getCartByUserId(userId);
        if (cartOptional.isPresent()) {
            return ResponseEntity.ok(cartOptional.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // xoá item ra khỏi giỏ hàng
    @DeleteMapping(value = "/{userId}/item/{itemId}")
    public ResponseEntity<?> removeItemFromCart(@PathVariable String userId, @PathVariable String itemId) {
        Optional<Cart> cartOptional = cartService.getCartByUserId(userId);

        if (cartOptional.isPresent()) {
            Cart cart = cartOptional.get();
            cart.getItems().removeIf(item -> item.getId().equals(itemId));
            cartService.saveOrUpdate(cart);
            return ResponseEntity.ok(cart);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Xoá giỏ hàng
    @DeleteMapping(value = "/{userId}")
    public ResponseEntity<?> clearCart(@PathVariable String userId) {
        Optional<Cart> cartOptional = cartService.getCartByUserId(userId);

        if (cartOptional.isPresent()) {
            cartService.deleteCartById(cartOptional.get().getId());
            return ResponseEntity.ok("Cart cleared successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // cập nhật
    @PostMapping("/{userId}/update")
    public ResponseEntity<?> updateItemInCart(@PathVariable String userId, @RequestBody CartItem cartItem) {
        Optional<Cart> cartOptional = cartService.getCartByUserId(userId);

        if (cartOptional.isPresent()) {
            Cart cart = cartOptional.get();
            for (CartItem item : cart.getItems()) {
                if (item.getId().equals(cartItem.getId())) {
                    item.setProductId(cartItem.getProductId());
                    item.setColor(cartItem.getColor());
                    item.setSize(cartItem.getSize());
                    item.setQuantity(cartItem.getQuantity());
                    cartService.saveOrUpdate(cart);
                    return ResponseEntity.ok(cart);
                }
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cart item not found");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cart not found");
        }
    }

    // xoá item
    @PostMapping(value = "/{userId}/removeItems")
    public ResponseEntity<?> removeSelectedItemsFromCart(@PathVariable String userId,
            @RequestBody List<String> itemIds) {
        Optional<Cart> cartOptional = cartService.getCartByUserId(userId);

        if (cartOptional.isPresent()) {
            Cart cart = cartOptional.get();
            cart.getItems().removeIf(item -> itemIds.contains(item.getId()));
            cartService.saveOrUpdate(cart);
            return ResponseEntity.ok("Selected items removed successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
