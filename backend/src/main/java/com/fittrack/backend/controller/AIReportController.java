package com.fittrack.backend.controller;

import com.fittrack.backend.service.AIReportService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/ai")
public class AIReportController {
    private final AIReportService aiReportService;

    public AIReportController(AIReportService aiReportService) {
        this.aiReportService = aiReportService;
    }

    @GetMapping("/report")
    public String generateReport(Authentication auth) throws IOException {
        return aiReportService.generateReport(auth.getName());
    }
}
