package com.nhom16.vali.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import com.nhom16.vali.config.Config;
import com.nhom16.vali.entity.Payment;
import org.springframework.web.bind.annotation.GetMapping;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import com.nhom16.vali.entity.Order;
import com.nhom16.vali.repository.OrderRepo;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;
import org.springframework.http.ResponseEntity;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/v1/payment")
// public class PaymentController {

// @GetMapping("/save")
// public ResponseEntity<Payment> createPayment(HttpServletRequest req) throws
// UnsupportedEncodingException {
// long amount = 100000 * 100;
// String orderType = "other";
// String vnp_TxnRef = Config.getRandomNumber(8);
// String vnp_IpAddr = Config.getIpAddress(req);
// String vnp_TmnCode = Config.vnp_TmnCode;

// Map<String, String> vnp_Params = new HashMap<>();
// vnp_Params.put("vnp_Version", Config.vnp_Version);
// vnp_Params.put("vnp_Command", Config.vnp_Command);
// vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
// vnp_Params.put("vnp_Amount", String.valueOf(amount));
// vnp_Params.put("vnp_CurrCode", "VND");
// vnp_Params.put("vnp_BankCode", "NCB");

// vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
// vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);
// vnp_Params.put("vnp_OrderType", orderType);
// vnp_Params.put("vnp_Locale", "vn");
// vnp_Params.put("vnp_IpAddr", vnp_IpAddr);
// vnp_Params.put("vnp_ReturnUrl", Config.vnp_ReturnUrl);

// Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
// SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
// String vnp_CreateDate = formatter.format(cld.getTime());
// vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

// cld.add(Calendar.MINUTE, 15);
// String vnp_ExpireDate = formatter.format(cld.getTime());
// vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

// List<String> fieldNames = new ArrayList<>(vnp_Params.keySet());
// Collections.sort(fieldNames);
// StringBuilder hashData = new StringBuilder();
// StringBuilder query = new StringBuilder();
// Iterator<String> itr = fieldNames.iterator();
// while (itr.hasNext()) {
// String fieldName = itr.next();
// String fieldValue = vnp_Params.get(fieldName);
// if (fieldValue != null && fieldValue.length() > 0) {
// // Build hash data
// hashData.append(fieldName).append('=')
// .append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
// // Build query
// query.append(URLEncoder.encode(fieldName,
// StandardCharsets.US_ASCII.toString())).append('=')
// .append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
// if (itr.hasNext()) {
// query.append('&');
// hashData.append('&');
// }
// }
// }
// String queryUrl = query.toString();
// String vnp_SecureHash = Config.hmacSHA512(Config.secretKey,
// hashData.toString());
// queryUrl += "&vnp_SecureHash=" + URLEncoder.encode(vnp_SecureHash,
// StandardCharsets.US_ASCII.toString());
// String paymentUrl = Config.vnp_PayUrl + "?" + queryUrl;

// // Add logging
// System.out.println("Generated vnp_Params: " + vnp_Params);
// System.out.println("Hash Data: " + hashData);
// System.out.println("Query URL: " + queryUrl);
// System.out.println("Payment URL: " + paymentUrl);

// Payment payment = new Payment("success", "Payment URL generated
// successfully", paymentUrl);
// return ResponseEntity.ok(payment);
// }
// }
public class PaymentController {

    @Autowired
    private OrderRepo orderRepo;

    @PostMapping("/confirm")
    public ResponseEntity<String> confirmPayment(@RequestParam Map<String, String> allParams) {
        String vnp_ResponseCode = allParams.get("vnp_ResponseCode");
        if ("00".equals(vnp_ResponseCode)) {
            // Payment success
            String orderId = allParams.get("vnp_TxnRef"); // Assuming order ID is passed in vnp_TxnRef
            Optional<Order> optionalOrder = orderRepo.findById(orderId);
            if (optionalOrder.isPresent()) {
                Order order = optionalOrder.get();
                order.setPaymentStatus("Đã thanh toán");
                order.setShippingStatus("Chưa nhận hàng");
                orderRepo.save(order);

                // Clear items from cart
                // Logic to clear selected items from the cart
                return ResponseEntity.ok("Payment confirmed and order saved.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order not found.");
            }
        } else {
            // Payment failed
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Payment failed.");
        }
    }

    @GetMapping("/create")
    public ResponseEntity<Map<String, String>> createPayment(HttpServletRequest req,
            @RequestParam("amount") long amount) throws UnsupportedEncodingException {
        amount = amount * 100; // Convert to smallest unit
        String orderType = "other";
        String vnp_TxnRef = Config.getRandomNumber(8);
        String vnp_IpAddr = Config.getIpAddress(req);
        String vnp_TmnCode = Config.vnp_TmnCode;

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", Config.vnp_Version);
        vnp_Params.put("vnp_Command", Config.vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount));
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_BankCode", "NCB");

        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);
        vnp_Params.put("vnp_OrderType", orderType);
        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);
        vnp_Params.put("vnp_ReturnUrl", Config.vnp_ReturnUrl);

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        List<String> fieldNames = new ArrayList<>(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator<String> itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = itr.next();
            String fieldValue = vnp_Params.get(fieldName);
            if (fieldValue != null && fieldValue.length() > 0) {
                // Build hash data
                hashData.append(fieldName).append('=')
                        .append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                // Build query
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString())).append('=')
                        .append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = Config.hmacSHA512(Config.secretKey, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + URLEncoder.encode(vnp_SecureHash, StandardCharsets.US_ASCII.toString());
        String paymentUrl = Config.vnp_PayUrl + "?" + queryUrl;

        Map<String, String> response = new HashMap<>();
        response.put("paymentUrl", paymentUrl);

        // Add logging
        System.out.println("Generated vnp_Params: " + vnp_Params);
        System.out.println("Hash Data: " + hashData);
        System.out.println("Query URL: " + queryUrl);
        System.out.println("Payment URL: " + paymentUrl);

        return ResponseEntity.ok(response);
    }

}