package com.fittrack.backend.repository;

import com.fittrack.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    long countByEnabledTrue();

    List<User> findByDeletedFalse();

    long countByDeletedFalse();
    long countByEnabledTrueAndDeletedFalse();

    @Query("""
            SELECT MONTH(u.createdAt), COUNT(u)
            FROM User u
            GROUP BY MONTH(u.createdAt)
           """)
    List<Object[]> getMonthlyGrowth();
}
