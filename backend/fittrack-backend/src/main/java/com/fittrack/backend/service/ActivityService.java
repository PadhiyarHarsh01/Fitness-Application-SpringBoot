package com.fittrack.backend.service;

import com.fittrack.backend.dto.ActivityRequest;
import com.fittrack.backend.entity.Activity;
import com.fittrack.backend.entity.User;
import com.fittrack.backend.repository.ActivityRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ActivityService {

    private final ActivityRepository activityRepository;

    public ActivityService(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    public Activity create(ActivityRequest req, User user) {
        Activity activity = new Activity();
        activity.setName(req.getName());
        activity.setType(req.getType());
        activity.setDuration(req.getDuration());
        activity.setCalories(req.getCalories());
        activity.setDate(LocalDate.parse(req.getDate()));
        activity.setUser(user);

        return activityRepository.save(activity);
    }

    public List<Activity> getUserActivities(User user) {
        return activityRepository.findByUser(user);
    }

    public Activity update(Long id, ActivityRequest req) {
        Activity activity = activityRepository.findById(id).orElseThrow();
        activity.setName(req.getName());
        activity.setType(req.getType());
        activity.setDuration(req.getDuration());
        activity.setCalories(req.getCalories());
        activity.setDate(LocalDate.parse(req.getDate()));

        return activityRepository.save(activity);
    }

    public void delete(Long id) {
        activityRepository.deleteById(id);
    }
}
