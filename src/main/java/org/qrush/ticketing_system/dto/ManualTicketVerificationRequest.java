package org.qrush.ticketing_system.dto;

import java.util.List;

/**
 * Request payload for verifying a ticket via manual entry rather than QR scan.
 */
public record ManualTicketVerificationRequest(
        String ticketNumber,
        Long staffUserId,
        String gate,
        Long eventId
) {
    /**
     * Convenience factory to reuse parsing logic for single tickets while working with bulk operations.
     */
    public static ManualTicketVerificationRequest fromBulk(String ticketNumber, BulkCheckInRequest bulkRequest) {
        return new ManualTicketVerificationRequest(
                ticketNumber,
                bulkRequest.staffUserId(),
                bulkRequest.gate(),
                bulkRequest.eventId()
        );
    }

    /**
     * Sanitises and de-duplicates the ticket numbers supplied by a bulk request.
     */
    public static List<String> normaliseTicketNumbers(BulkCheckInRequest request) {
        return request.ticketNumbers().stream()
                .map(number -> number == null ? "" : number.trim())
                .filter(number -> !number.isEmpty())
                .distinct()
                .toList();
    }
}
