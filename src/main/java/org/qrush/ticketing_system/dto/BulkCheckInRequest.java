package org.qrush.ticketing_system.dto;

import java.util.List;

/**
 * Request payload for checking in multiple tickets in one call.
 */
public record BulkCheckInRequest(
        List<String> ticketNumbers,
        Long staffUserId,
        String gate,
        Long eventId
) {
    public BulkCheckInRequest {
        ticketNumbers = ticketNumbers == null ? List.of() : ticketNumbers;
    }
}
