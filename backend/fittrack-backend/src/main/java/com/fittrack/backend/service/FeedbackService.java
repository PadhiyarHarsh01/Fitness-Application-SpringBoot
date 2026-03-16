package com.fittrack.backend.service;

import com.fittrack.backend.dto.FeedbackRequest;
import com.fittrack.backend.dto.FeedbackResponse;
import com.fittrack.backend.entity.Feedback;
import com.fittrack.backend.entity.User;
import com.fittrack.backend.repository.FeedbackRepository;
import com.fittrack.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackService {
    private final FeedbackRepository feedbackRepository;
    private final UserRepository userRepository;

    public FeedbackService(FeedbackRepository feedbackRepository, UserRepository userRepository) {
        this.feedbackRepository = feedbackRepository;
        this.userRepository = userRepository;
    }

    public void submitFeedback(String email, FeedbackRequest req) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Feedback feedback = new Feedback();
        feedback.setRating(req.getRating());
        feedback.setMessage(req.getMessage());
        feedback.setUser(user);

        feedbackRepository.save(feedback);
    }

    public List<FeedbackResponse> getAllFeedback() {
        return feedbackRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(f -> new FeedbackResponse(
                        f.getUser().getName(),
                        f.getUser().getEmail(),
                        f.getRating(),
                        f.getMessage(),
                        f.getCreatedAt()
                ))
                .toList();
    }
}
