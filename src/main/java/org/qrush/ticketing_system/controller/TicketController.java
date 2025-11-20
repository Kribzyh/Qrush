package org.qrush.ticketing_system.controller;

import org.qrush.ticketing_system.dto.BookTicketRequest;
import org.qrush.ticketing_system.dto.BulkCheckInRequest;
import org.qrush.ticketing_system.dto.BulkCheckInResponse;
import org.qrush.ticketing_system.dto.ManualTicketVerificationRequest;
import org.qrush.ticketing_system.dto.TicketScanRequest;
import org.qrush.ticketing_system.dto.TicketScanResponse;
import org.qrush.ticketing_system.entity.TicketEntity;
import org.qrush.ticketing_system.service.TicketService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @GetMapping
    public List<TicketEntity> getAllTickets() {
        return ticketService.getAllTickets();
    }

    @GetMapping("/{id}")
    public TicketEntity getTicketById(@PathVariable Long id) {
        return ticketService.getTicketById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found with ID: " + id));
    }

    @PostMapping
    public TicketEntity createTicket(@RequestBody TicketEntity ticket) {
        return ticketService.createTicket(ticket);
    }

    @PostMapping("/book")
    public List<TicketEntity> bookTickets(@RequestBody BookTicketRequest request) {
        return ticketService.bookTickets(request);
    }

    @PostMapping("/scan")
    public TicketScanResponse scanTicket(@RequestBody TicketScanRequest request) {
        return ticketService.scanTicket(request);
    }

    @PostMapping("/manual-verify")
    public TicketScanResponse verifyTicketManually(@RequestBody ManualTicketVerificationRequest request) {
        return ticketService.verifyTicketManually(request);
    }

    @PostMapping("/bulk-check-in")
    public BulkCheckInResponse bulkCheckIn(@RequestBody BulkCheckInRequest request) {
        return ticketService.bulkCheckIn(request);
    }

    @PutMapping("/{id}")
    public TicketEntity updateTicket(@PathVariable Long id, @RequestBody TicketEntity updatedTicket) {
        return ticketService.updateTicket(id, updatedTicket);
    }

    @DeleteMapping("/{id}")
    public void deleteTicket(@PathVariable Long id) {
        ticketService.deleteTicket(id);
    }
}
