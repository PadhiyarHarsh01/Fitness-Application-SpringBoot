package com.fittrack.backend.controller;

import com.fittrack.backend.dto.DashboardGoalsDTO;
import com.fittrack.backend.dto.DashboardSummaryDTO;
import com.fittrack.backend.dto.RecentActivityDTO;
import com.fittrack.backend.entity.User;
import com.fittrack.backend.repository.UserRepository;
import com.fittrack.backend.repository.WaterRepository;
import com.fittrack.backend.service.DashboardService;
import com.fittrack.backend.service.WaterService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;
    private final UserRepository  userRepository;
    private final WaterService waterService;

    public DashboardController(DashboardService dashboardService,  UserRepository userRepository, WaterService waterService) {
        this.dashboardService = dashboardService;
        this.userRepository = userRepository;
        this.waterService = waterService;
    }

    @GetMapping("/summary")
    public DashboardSummaryDTO getSummary(Authentication auth) {
        String email = auth.getName();
//        User user = userRepository.findByEmail(email).orElseThrow();
        return dashboardService.getSummary(email);
    }

    @GetMapping("/recent-activities")
    public List<RecentActivityDTO> getRecentActivities(Authentication auth) {
        return dashboardService.getRecentActivities(auth.getName());
    }

    @GetMapping("/goals")
    public DashboardGoalsDTO getGoals(Authentication auth) {
        return dashboardService.getTodayGoals(auth.getName());
    }
}
