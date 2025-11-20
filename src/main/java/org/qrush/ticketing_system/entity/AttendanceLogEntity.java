package org.qrush.ticketing_system.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "attendance_log")
public class AttendanceLogEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long logID;

    @ManyToOne
    @JoinColumn(name = "ticketID", nullable = false)
    private TicketEntity ticket;

    @ManyToOne
    @JoinColumn(name = "eventID", nullable = false)
    private EventEntity event;

    @ManyToOne
    @JoinColumn(name = "userID", nullable = false)
    private UserEntity user;

    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;

    @Column(nullable = false)
    private String status;

    @Column(name = "re_entry")
    private Integer reEntry;

    @Column(name = "gate")
    private String gate;

    // Getters and Setters
    public Long getLogID() {
        return logID;
    }

    public void setLogID(Long logID) {
        this.logID = logID;
    }

    public TicketEntity getTicket() {
        return ticket;
    }

    public void setTicket(TicketEntity ticket) {
        this.ticket = ticket;
    }

    public EventEntity getEvent() {
        return event;
    }

    public void setEvent(EventEntity event) {
        this.event = event;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getReEntry() {
        return reEntry;
    }

    public void setReEntry(Integer reEntry) {
        this.reEntry = reEntry;
    }

    public String getGate() {
        return gate;
    }

    public void setGate(String gate) {
        this.gate = gate;
    }
}
