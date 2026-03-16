package com.fittrack.backend.repository;

import com.fittrack.backend.entity.User;
import com.fittrack.backend.entity.WaterIntake;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.Optional;

public interface WaterRepository extends JpaRepository<WaterIntake, Long> {
    Optional<WaterIntake> findByUserAndDate(User user, LocalDate date);

    @Query("""
        SELECT COALESCE(SUM(w.glasses), 0)
        FROM WaterIntake w
        WHERE w.user = :user AND w.date = CURRENT_DATE
        """)
    int getTodayCount(@Param("user") User user);

}
