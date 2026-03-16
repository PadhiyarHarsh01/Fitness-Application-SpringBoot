package com.fittrack.backend.controller;

import com.fittrack.backend.dto.FeedbackRequest;
import com.fittrack.backend.dto.FeedbackResponse;
import com.fittrack.backend.service.FeedbackService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {
    private final FeedbackService feedbackService;

    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public String submitFeedback(Authentication auth,
                                 @RequestBody FeedbackRequest req) {
        feedbackService.submitFeedback(auth.getName(), req);

        return "Feedback submitted successfully";
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public List<FeedbackResponse> getAllFeedback() {
        return feedbackService.getAllFeedback();
    }
}
