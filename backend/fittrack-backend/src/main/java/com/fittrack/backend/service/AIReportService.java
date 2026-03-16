package com.fittrack.backend.service;

import com.fittrack.backend.entity.Activity;
import com.fittrack.backend.entity.User;
import com.fittrack.backend.repository.ActivityRepository;
import com.fittrack.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class AIReportService {

    private final GeminiService geminiService;
    private final ActivityRepository activityRepository;
    private final UserRepository userRepository;

    public AIReportService(GeminiService geminiService, ActivityRepository activityRepository, UserRepository userRepository) {
        this.geminiService = geminiService;
        this.activityRepository = activityRepository;
        this.userRepository = userRepository;
    }

    private User getUser(String email) {
        return userRepository.findByEmail(email).orElseThrow();
    }

    public String generateReport(String email) throws IOException {
        User user = getUser(email);

        List<Activity> activities = activityRepository.findByUser(user);

        StringBuilder activitySummary = new StringBuilder();

        for (Activity a : activities) {
            activitySummary.append(
                    a.getName() + "|" +
                    a.getType() + "|" +
                    a.getDuration() + "min | " +
                    a.getCalories() + "kcal\n"

            );
        }

        String prompt = """
                You are a professional fitness AI.
                
                        Analyze this user workout data and return ONLY JSON:
                
                        {
                          overallScore: number,
                          trend: string,
                          consistency: string,
                          weeklyWorkouts: number,
                          summary: string,
                          insights: [{title, description}],
                          futureRecommendations: [{week, goal, activities}],
                          riskFactors: [],
                          opportunities: []
                        }
                
                        Activity Data:
                """ + activitySummary;

        return geminiService.generateReport(prompt);
    }
}
