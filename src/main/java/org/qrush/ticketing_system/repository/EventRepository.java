package org.qrush.ticketing_system.repository;

import org.qrush.ticketing_system.entity.EventEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<EventEntity, Long> {
	@Query("SELECT e FROM EventEntity e WHERE LOWER(e.organizer) = LOWER(:identifier)")
	List<EventEntity> findByOrganizerIdentifier(@Param("identifier") String identifier);
}
