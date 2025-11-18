package org.qrush.ticketing_system.dto.dashboard;

import java.time.LocalDateTime;
import java.util.List;

public record StaffDashboardResponse(
        EventInfo currentEvent,
        long totalCapacity,
        long ticketsSold,
        long checkedIn,
        long pending,
        List<ScanRecord> recentScans
) {
    public record EventInfo(
            Long eventId,
            String title,
            LocalDateTime eventStart,
            LocalDateTime eventEnd,
            String location
    ) {
    }

    public record ScanRecord(
            Long logId,
            Long ticketId,
            String ticketNumber,
            String attendeeName,
            String attendeeEmail,
            LocalDateTime scanTime,
            String status,
            String gate
    ) {
    }
}
