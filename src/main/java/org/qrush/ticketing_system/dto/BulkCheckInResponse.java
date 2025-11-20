package org.qrush.ticketing_system.dto;

import java.util.List;

/**
 * Aggregated response for a bulk check-in request summarising outcomes alongside per-ticket results.
 */
public record BulkCheckInResponse(
        int totalProcessed,
        int successful,
        int duplicates,
        int invalid,
        List<TicketScanResponse> results
) {
}
