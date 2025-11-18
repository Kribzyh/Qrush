package org.qrush.ticketing_system.service;

import org.qrush.ticketing_system.dto.BookTicketRequest;
import org.qrush.ticketing_system.entity.EventEntity;
import org.qrush.ticketing_system.entity.TicketEntity;
import org.qrush.ticketing_system.entity.UserEntity;
import org.qrush.ticketing_system.repository.EventRepository;
import org.qrush.ticketing_system.repository.TicketRepository;
import org.qrush.ticketing_system.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.IntStream;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;
    private final EventRepository eventRepository;

    public TicketService(TicketRepository ticketRepository,
                         UserRepository userRepository,
                         EventRepository eventRepository) {
        this.ticketRepository = ticketRepository;
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
    }

    public List<TicketEntity> getAllTickets() {
        return ticketRepository.findAll();
    }

    public Optional<TicketEntity> getTicketById(Long id) {
        return ticketRepository.findById(id);
    }

    public TicketEntity createTicket(TicketEntity ticket) {
        return ticketRepository.save(ticket);
    }

    public List<TicketEntity> bookTickets(BookTicketRequest request) {
        if (request.getUserId() == null || request.getEventId() == null) {
            throw new IllegalArgumentException("Both userId and eventId are required to book tickets.");
        }

        UserEntity user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + request.getUserId()));

        EventEntity event = eventRepository.findById(request.getEventId())
                .orElseThrow(() -> new IllegalArgumentException("Event not found with ID: " + request.getEventId()));

        int quantity = Math.max(1, request.getQuantity());
        String ticketType = Optional.ofNullable(request.getTicketType()).filter(type -> !type.isBlank())
                .orElse("REGULAR");

        List<TicketEntity> tickets = IntStream.range(0, quantity)
                .mapToObj(index -> createTicketEntity(user, event, ticketType))
                .map(ticketRepository::save)
                .toList();

        return tickets;
    }

    private TicketEntity createTicketEntity(UserEntity user, EventEntity event, String ticketType) {
        TicketEntity ticket = new TicketEntity();
        ticket.setUser(user);
        ticket.setEvent(event);
        ticket.setTicketType(ticketType);
        ticket.setStatus("ACTIVE");
        ticket.setPrice(event.getTicketPrice());
        ticket.setPurchaseDate(LocalDateTime.now());
        ticket.setQrCode(UUID.randomUUID().toString());
        return ticket;
    }

    public TicketEntity updateTicket(Long id, TicketEntity updatedTicket) {
        return ticketRepository.findById(id).map(ticket -> {
            ticket.setUser(updatedTicket.getUser());
            ticket.setEvent(updatedTicket.getEvent());
            ticket.setQrCode(updatedTicket.getQrCode());
            ticket.setPrice(updatedTicket.getPrice());
            ticket.setPurchaseDate(updatedTicket.getPurchaseDate());
            ticket.setTicketType(updatedTicket.getTicketType());
            ticket.setStatus(updatedTicket.getStatus());
            return ticketRepository.save(ticket);
        }).orElseThrow(() -> new RuntimeException("Ticket not found with ID: " + id));
    }

    public void deleteTicket(Long id) {
        ticketRepository.deleteById(id);
    }
}
