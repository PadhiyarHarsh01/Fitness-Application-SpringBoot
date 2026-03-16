package com.fittrack.backend.repository;

import com.fittrack.backend.entity.Activity;
import com.fittrack.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface ActivityRepository extends JpaRepository<Activity, Long> {
    List<Activity> findByUser(User user);

    List<Activity> findTop5ByUserOrderByDateDesc(User user);

    List<Activity> findByUserAndDateBetween(
            User user,
            LocalDate start,
            LocalDate end
    );

    List<Activity> findByUserAndDate(User user, LocalDate date);

    int countByUser(User user);

    @Query("SELECT COALESCE(SUM(a.calories),0) FROM Activity a")
    int sumAllCalories();
}
