package com.fittrack.backend.dto;

public record ProgressDataDTO (
        String label,
        int workouts,
        int calories
) {}
