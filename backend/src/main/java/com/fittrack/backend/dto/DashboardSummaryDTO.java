package com.fittrack.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardSummaryDTO {
    private String username;
    private int totalWorkouts;
    private int caloriesBurned;
    private int weeklyActivities;
    private int currentStreak;
    private int dailyCaloriesGoal;
    private int todayCaloriesBurned;
}
