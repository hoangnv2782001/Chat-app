package com.example.chatapp.controller;

import java.time.LocalDateTime;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    @GetMapping("/test/a")
    public LocalDateTime test(){
        return LocalDateTime.now();
    }
}
