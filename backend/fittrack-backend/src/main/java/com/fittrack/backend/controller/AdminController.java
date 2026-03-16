package com.fittrack.backend.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fittrack.backend.entity.Activity;
import com.fittrack.backend.entity.Role;
import com.fittrack.backend.entity.User;
import com.fittrack.backend.repository.ActivityRepository;
import com.fittrack.backend.repository.UserRepository;
import com.fittrack.backend.service.AIReportService;
import com.fittrack.backend.service.GeminiService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
public class AdminController {

    private final UserRepository userRepository;
    private final ActivityRepository activityRepository;
    private final AIReportService aiReportService;
    private final GeminiService  geminiService;

    public AdminController(UserRepository userRepository, ActivityRepository activityRepository, AIReportService aiReportService, GeminiService geminiService) {
        this.userRepository = userRepository;
        this.activityRepository = activityRepository;
        this.aiReportService = aiReportService;
        this.geminiService = geminiService;
    }

    @GetMapping("/dashboard")
    public Map<String, Object> getDashboardStates() {
        long totalUsers = userRepository.countByDeletedFalse();
        long totalActivities = activityRepository.count();

        int totalCalories = activityRepository.sumAllCalories();

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", totalUsers);
        stats.put("totalActivities", totalActivities);
        stats.put("totalCalories", totalCalories);

        return stats;
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findByDeletedFalse();
    }

    @GetMapping("/users/{id}/activities")
    public List<Activity> getUserActivities(@PathVariable Long id) {
        User user = userRepository.findById(id).orElseThrow();
        return activityRepository.findByUser(user);
    }

    @GetMapping("/users/{id}/ai-report")
    public String generateUserReport(@PathVariable Long id) throws Exception {
        User user = userRepository.findById(id).orElseThrow();
        return aiReportService.generateReport(user.getEmail());
    }

    @PutMapping("/users/{id}/role")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public User changeUserRole(@PathVariable Long id, @RequestParam String role) {
        User user = userRepository.findById(id).orElseThrow();
        user.setRole(Role.valueOf(role));
        return userRepository.save(user);
    }

    @PutMapping("/users/{id}/disable")
    @PreAuthorize("hasRole('ADMIN')")
    public User disableUser(@PathVariable Long id) {
        User user = userRepository.findById(id).orElseThrow();
        user.setEnabled(false);
        return userRepository.save(user);
    }

    @DeleteMapping("/users/{id}")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public void deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
    }

    @GetMapping("/analytics")
    public Map<String, Object> getPlatformAnalytics() {

        long totalUsers = userRepository.countByDeletedFalse();
        long activeUsers = userRepository.countByEnabledTrueAndDeletedFalse();
        long totalActivities = activityRepository.count();

        Map<String, Object> data = new HashMap<>();
        data.put("totalUsers", totalUsers);
        data.put("activeUsers", activeUsers);
        data.put("totalActivities", totalActivities);

        return data;
    }

    @GetMapping("/monthly-growth")
    public List<Map<String, Object>> getMonthlyGrowth() {

        List<Object[]> results = userRepository.getMonthlyGrowth();

        return results.stream().map(obj -> {
            int monthNumber = ((Number) obj[0]).intValue();
            long count = ((Number) obj[1]).longValue();

            String monthName = java.time.Month.of(monthNumber).name();

            Map<String, Object> map = new HashMap<>();
            map.put("month", monthName);
            map.put("count", count);

            return map;
        }).toList();
    }

    @GetMapping("/platform-ai-report")
    public Map<String, Object> generatePlatformReport() throws Exception {

        long users = userRepository.count();
        long activeUsers = userRepository.countByEnabledTrueAndDeletedFalse();
        long activities = activityRepository.count();

        String prompt = """
            You are a SaaS analytics AI.

            Return ONLY valid JSON.

            {
              "platformScore": number,
              "growthTrend": string,
              "summary": string,
              "keyInsights": [{"title": string, "description": string}],
              "recommendations": [{"title": string, "description": string}],
              "riskFactors": [string],
              "opportunities": [string]
            }

            Platform Data:
            Total Users: %d
            Active Users: %d
            Total Activities: %d
            """.formatted(users, activeUsers, activities);

        String raw = geminiService.generateReport(prompt);

        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(raw);

        JsonNode parts = root.path("candidates")
                .path(0)
                .path("content")
                .path("parts");

        StringBuilder combined = new StringBuilder();

        for (JsonNode part : parts) {
            combined.append(part.path("text").asText());
        }

        String cleaned = combined.toString()
                .replace("```json", "")
                .replace("```", "")
                .trim();

        return mapper.readValue(cleaned, Map.class);
    }

    /* @GetMapping("/debug")
    public Map<String, Object> debug(Authentication auth) {
        Map<String, Object> map = new HashMap<>();
        map.put("name", auth.getName());
        map.put("authorities", auth.getAuthorities());
        return map;
    } */
}
