package com.fittrack.backend.service;

import com.fittrack.backend.dto.DashboardGoalsDTO;
import com.fittrack.backend.dto.DashboardSummaryDTO;
import com.fittrack.backend.dto.RecentActivityDTO;
import com.fittrack.backend.entity.Activity;
import com.fittrack.backend.entity.User;
import com.fittrack.backend.repository.ActivityRepository;
import com.fittrack.backend.repository.UserRepository;
import com.fittrack.backend.repository.WaterRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.IntStream;

@Service
public class DashboardService {
    private final ActivityRepository activityRepository;
    private final UserRepository userRepository;
    private final WaterRepository waterRepository;

    public DashboardService(ActivityRepository activityRepository, UserRepository userRepository,  WaterRepository waterRepository) {
        this.activityRepository = activityRepository;
        this.userRepository = userRepository;
        this.waterRepository = waterRepository;
    }

    private User getLoggedInUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public DashboardSummaryDTO getSummary(String email) {
        User user = getLoggedInUser(email);

        List<Activity> allActivities = activityRepository.findByUserAndDateBetween(
                user,
                LocalDate.now().minusDays(6),
                LocalDate.now()
        );

        int totalCalories = allActivities.stream()
                .mapToInt(Activity::getCalories)
                .sum();

        int todayCalories = allActivities.stream()
                .filter(a -> a.getDate().equals(LocalDate.now()))
                .mapToInt(Activity :: getCalories)
                .sum();

        int currentStrack = (int) IntStream.iterate(0, i -> i + 1)
                .takeWhile(i -> allActivities.stream()
                        .anyMatch(a -> a.getDate().equals(LocalDate.now().minusDays(i))))
                .count();

        return new DashboardSummaryDTO(
                user.getName(),
                activityRepository.countByUser(user),
                totalCalories,
                allActivities.size(),
                currentStrack,
                user.getDailyCalorieGoal(),
                todayCalories
        );
    }

    public List<RecentActivityDTO> getRecentActivities(String email) {
        User user = getLoggedInUser(email);

        return activityRepository.findTop5ByUserOrderByDateDesc(user)
                .stream()
                .map(a -> new RecentActivityDTO(
                        a.getId(),
                        a.getName(),
                        a.getType(),
                        a.getDuration(),
                        a.getCalories(),
                        a.getDate()
                ))
                .toList();
    }

    public DashboardGoalsDTO getTodayGoals(String email) {
        User user = getLoggedInUser(email);

        List<Activity> todayActivities = activityRepository.findByUserAndDate(user, LocalDate.now());

        int caloriesBurned = todayActivities.stream()
                .mapToInt(Activity::getCalories)
                .sum();

        int steps = todayActivities.stream()
                .mapToInt(a -> {
                        return switch (a.getType()) {
                            case "Cardio" -> a.getDuration() * 160;
                            case "Walking" -> a.getDuration() * 100;
                            default -> 0;
                        };
                })
                .sum();

        int waterGlasses = waterRepository.getTodayCount(user);

        return new DashboardGoalsDTO(
                caloriesBurned,
                user.getDailyCalorieGoal(),
                steps,
                10000,
                waterGlasses,
                8
        );
    }
}
