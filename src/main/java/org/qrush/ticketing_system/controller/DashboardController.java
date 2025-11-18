package org.qrush.ticketing_system.controller;

import org.qrush.ticketing_system.dto.dashboard.AttendeeDashboardResponse;
import org.qrush.ticketing_system.dto.dashboard.OrganizerDashboardResponse;
import org.qrush.ticketing_system.dto.dashboard.StaffDashboardResponse;
import org.qrush.ticketing_system.service.DashboardService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/attendee/{userId}")
    public AttendeeDashboardResponse getAttendeeDashboard(@PathVariable Long userId) {
        return dashboardService.getAttendeeDashboard(userId);
    }

    @GetMapping("/organizer/{userId}")
    public OrganizerDashboardResponse getOrganizerDashboard(@PathVariable Long userId) {
        return dashboardService.getOrganizerDashboard(userId);
    }

    @GetMapping("/staff")
    public StaffDashboardResponse getStaffDashboard(@RequestParam Long eventId) {
        return dashboardService.getStaffDashboard(eventId);
    }
}
