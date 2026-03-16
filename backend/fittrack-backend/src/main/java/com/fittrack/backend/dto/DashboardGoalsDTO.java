package com.fittrack.backend.dto;

public record DashboardGoalsDTO(
        int caloriesCurrent,
        int caloriesGoal,
        int stepsCurrent,
        int stepsGoal,
        int waterCurrent,
        int waterGoal
) {}
