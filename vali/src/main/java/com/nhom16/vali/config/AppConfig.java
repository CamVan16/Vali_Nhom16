// package com.nhom16.vali.config;


// import java.util.Properties;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import jakarta.mail.MessagingException;
// import jakarta.mail.internet.MimeMessage;
// @Configuration
// public class AppConfig {
//     @Value("${spring.mail.host}")
//     private String mailHost;
//     @Value("${spring.mail.port}")
//     private String mailPort;
//     @Value("${spring.mail.username}")
//     private String mailUsername;
//     @Value("${spring.mail.password}")
//     private String mailPassword;

//     @Bean
//     public JavaMailSender getJavaMailSender(){
//         JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();
//         javaMailSender.setHost(mailHost);
//         javaMailSender.setPort(Integer.parseInt(mailPort));
//         javaMailSender.setUsername(mailUsername);
//         javaMailSender.setPassword(mailPassword);

//         Properties props = javaMailSender.getJavaMailProperties();
//         props.put("mail.smtp.starttls.enable", "true");
//         return javaMailSender;

//     }
// }
