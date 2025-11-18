package org.qrush.ticketing_system.service;

import org.qrush.ticketing_system.entity.EventEntity;
import org.qrush.ticketing_system.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public List<EventEntity> getAllEvents() {
        return eventRepository.findAll();
    }

    public Optional<EventEntity> getEventById(Long id) {
        return eventRepository.findById(id);
    }

    public EventEntity createEvent(EventEntity event) {
        return eventRepository.save(event);
    }

    public EventEntity updateEvent(Long id, EventEntity updatedEvent) {
        return eventRepository.findById(id).map(event -> {
            event.setName(updatedEvent.getName());
            event.setLocation(updatedEvent.getLocation());
            event.setCategory(updatedEvent.getCategory());
            event.setStartDate(updatedEvent.getStartDate());
            event.setEndDate(updatedEvent.getEndDate());
            event.setTicketPrice(updatedEvent.getTicketPrice());
            event.setCapacity(updatedEvent.getCapacity());
            event.setOrganizer(updatedEvent.getOrganizer());
            event.setOrganizerDisplayName(updatedEvent.getOrganizerDisplayName());
            event.setOrganizerEmail(updatedEvent.getOrganizerEmail());
            event.setOrganizerPhone(updatedEvent.getOrganizerPhone());
            event.setDescription(updatedEvent.getDescription());
            return eventRepository.save(event);
        }).orElseThrow(() -> new RuntimeException("Event not found with ID: " + id));
    }

    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }
}
