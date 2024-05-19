package com.nhom16.vali.controller;

import com.nhom16.vali.entity.Product;
import com.nhom16.vali.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/v1/product")
public class ProductController {
    @Autowired
    private ProductService productService;

    @PostMapping(value = "/save")
    private String saveProduct(@RequestBody Product product) {
        productService.saveOrUpdate(product);
        return product.getId();
    }

    @GetMapping(value = "/getall")
    public Iterable<Product> getProducts() {
        return productService.listAllProducts();
    }

    @GetMapping(value = "/get/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable("id") String id) {
        Product product = productService.getProductById(id);
        if (product != null) {
            return new ResponseEntity<>(product, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //delete
}
