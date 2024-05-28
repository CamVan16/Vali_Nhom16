package com.nhom16.vali.service;

import com.nhom16.vali.entity.Product;
import com.nhom16.vali.repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class ProductService {

    @Autowired
    private ProductRepo repo;

    public void saveOrUpdate(Product product) {
        repo.save(product);
    }

    public Iterable<Product> listAllProducts() {
        return repo.findAll();
    }

    public Product getProductById(String id) {
        return repo.findById(id).orElse(null);
    }

    public Map<String, Map<String, Integer>> getProductStock(String productId) {
        Product product = getProductById(productId);
        if (product != null) {
            return product.getStock();
        }
        return null;
    }

    public void saveOrUpdateProductStock(String productId, String color, String size,
            Map<String, Integer> sizeStockMap) {
        Product product = getProductById(productId);
        if (product != null) {
            Map<String, Map<String, Integer>> stockMap = product.getStock();
            Map<String, Integer> colorStockMap = stockMap.getOrDefault(color, null);
            if (colorStockMap != null) {
                colorStockMap.put(size, sizeStockMap.getOrDefault(size, 0));
                stockMap.put(color, colorStockMap);
                product.setStock(stockMap);
                saveOrUpdate(product);
            }
        }
    }

    public void deleteProduct(String id) {
        repo.deleteById(id);
    }
}
