package com.fittrack.backend.controller;

import com.fittrack.backend.dto.ProgressDataDTO;
import com.fittrack.backend.service.ProgressService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/progress")
public class ProgressController {

    private final ProgressService progressService;

    public ProgressController(ProgressService progressService) {
        this.progressService = progressService;
    }

    @GetMapping("/weekly")
    public List<ProgressDataDTO> weekly(Authentication auth) {
        return progressService.getWeeklyProgress(auth.getName());
    }

    @GetMapping("/monthly")
    public List<ProgressDataDTO> monthly(Authentication auth) {
        return progressService.getMonthlyProgress(auth.getName());
    }
}
