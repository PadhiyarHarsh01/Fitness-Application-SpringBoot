package com.fittrack.backend.controller;

import com.fittrack.backend.service.WaterService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/water")
public class WaterController {

    private final WaterService waterService;

    public WaterController(WaterService waterService) {
        this.waterService = waterService;
    }

    @PostMapping("/add")
    public void addGlass(Authentication auth) {
        waterService.addGlass(auth.getName());
    }
}
