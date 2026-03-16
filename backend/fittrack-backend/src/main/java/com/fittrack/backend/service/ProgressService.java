package com.fittrack.backend.service;

import com.fittrack.backend.dto.ProgressDataDTO;
import com.fittrack.backend.entity.Activity;
import com.fittrack.backend.entity.User;
import com.fittrack.backend.repository.ActivityRepository;
import com.fittrack.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.format.TextStyle;
import java.time.temporal.WeekFields;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProgressService {
    private final ActivityRepository activityRepository;
    private final UserRepository userRepository;

    public ProgressService(ActivityRepository activityRepository, UserRepository userRepository) {
        this.activityRepository = activityRepository;
        this.userRepository = userRepository;
    }

    private User getLoggedUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow();
    }

    public List<ProgressDataDTO> getWeeklyProgress(String email) {
        User user = getLoggedUser(email);

        LocalDate today = LocalDate.now();
        LocalDate startOfWeek = today.with(DayOfWeek.MONDAY);
        LocalDate endOfWeek = startOfWeek.plusDays(6);

        List<Activity> activities = activityRepository.findByUserAndDateBetween(user, startOfWeek, endOfWeek);

        List<ProgressDataDTO> result = new ArrayList<>();

        for (int i = 0; i < 7; i++) {
            LocalDate date = startOfWeek.plusDays(i);

            int calories = activities.stream()
                    .filter(a -> a.getDate().equals(date))
                    .mapToInt(Activity::getCalories)
                    .sum();

            int workouts = (int) activities.stream()
                    .filter(a -> a.getDate().equals(date))
                    .count();

            result.add(new ProgressDataDTO(
                    date.getDayOfWeek().getDisplayName(TextStyle.SHORT, Locale.ENGLISH),
                    workouts,
                    calories
            ));
        }

        return result;

    }

    public List<ProgressDataDTO> getMonthlyProgress(String email) {
        User user = getLoggedUser(email);

        LocalDate today = LocalDate.now();
        LocalDate startOfMonth = today.withDayOfMonth(1);

        List<Activity> activities = activityRepository.findByUserAndDateBetween(
                user,
                startOfMonth,
                today
        );

        WeekFields weekFields = WeekFields.ISO;

        Map<Integer, List<Activity>> grouped = activities.stream()
                .collect(Collectors.groupingBy(
                        a -> a.getDate().get(weekFields.weekOfMonth())
                ));

        return grouped.entrySet().stream()
                .sorted(Map.Entry.comparingByKey())
                .map(entry -> {
                    int calories = entry.getValue().stream()
                            .mapToInt(Activity::getCalories)
                            .sum();

                    return new ProgressDataDTO(
                            "Week " + entry.getKey(),
                            entry.getValue().size(),
                            calories
                    );
                })
                .toList();
    }
}
