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

    @PutMapping(value = "/update/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable("id") String id, @RequestBody Product productDetails) {
        Product product = productService.getProductById(id);
        if (product == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        product.setName(productDetails.getName());
        product.setType(productDetails.getType());
        product.setImg(productDetails.getImg());
        product.setPrice(productDetails.getPrice());
        product.setDiscount(productDetails.getDiscount());
        product.setStock(productDetails.getStock());
        product.setDescription(productDetails.getDescription());
        productService.saveOrUpdate(product);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable("id") String id) {
        Product product = productService.getProductById(id);
        if (product != null) {
            productService.deleteProduct(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
