package com.backend.savysnap;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SavySnapApplication {

    public static void main(String[] args) {
        SpringApplication.run(SavySnapApplication.class, args);
        System.out.println("========Successfully Started=========");
    }

}
