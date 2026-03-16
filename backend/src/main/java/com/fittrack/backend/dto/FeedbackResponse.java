package com.fittrack.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class FeedbackResponse {
    private String userName;
    private String email;
    private int rating;
    private String message;
    private LocalDateTime createdAt;
}
