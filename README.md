# Qrush - Event Ticketing System

Qrush is a modern, full-stack event ticketing platform designed to streamline the experience for organizers, attendees, and staff. It features a secure QR code-based entry system, organizer-driven analytics, and a responsive user interface that now pulls live data from the Spring Boot backend.

## 🚀 Tech Stack

*   **Backend**: Java (Spring Boot), Hibernate/JPA, RESTful controllers
*   **Frontend**: React.js (Create React App), Tailwind CSS utility classes, Lucide React icons, Sonner toasts
*   **Database**: MySQL by default (switchable in `application.properties`)
*   **Build Tools**: Maven wrapper for backend, npm scripts for frontend

## 📋 Prerequisites

*   **Java Development Kit (JDK)**: Version 17 or higher
*   **Node.js**: Version 18 or higher
*   **npm**: Installed with Node.js

## 🛠️ Setup & Installation

### 1. Backend Setup (Spring Boot)

Navigate to the root directory and run the application using Maven wrapper:

```bash
# Windows
./mvnw.cmd spring-boot:run

# Linux/Mac
./mvnw spring-boot:run
```

The backend server will start at `http://localhost:8080`.

### 2. Frontend Setup (React)

Open a new terminal, navigate to the `frontend` directory, install dependencies, and start the development server:

```bash
cd frontend
npm install
npm start
```

The frontend application will open at `http://localhost:3000` and proxy API requests to the backend at `http://localhost:8080`.

### 3. Environment Configuration

Create a `.env` file in `frontend/` if you need to override defaults:

```bash
REACT_APP_API_BASE_URL=http://localhost:8080/api
```

The backend reads database and JWT settings from `src/main/resources/application.properties`.

## 📂 Project Structure

*   `src/main/java`: Spring Boot backend source code (controllers, services, entities, DTOs).
*   `frontend/`: React frontend application.
    *   `src/components`: Reusable UI components (`EventCard`, Shadcn-inspired UI primitives).
    *   `src/pages`: Main application pages (Dashboards, Events, TicketView, Create/Edit Event).
    *   `src/services/api.js`: Centralized REST client used across the app.
    *   `src/hooks`: Custom React hooks (e.g., `useEvents`).
*   `docs/`: Project documentation and sample data (for API contract reference).

## ✨ Core Features

*   **Organizer Dashboard**: Live metrics (tickets sold, revenue, average attendance) with exportable CSV reports.
*   **Event Lifecycle**: Organizers can create new events and edit existing ones (`/create-event/:id`) with real-time persistence via the `PUT /api/events/{id}` endpoint.
*   **Profile-driven Branding**: Organizer contact information is stored locally per user and synced across all owned events, ensuring attendee-facing pages stay current.
*   **Attendee Experience**: Event catalog, details page, and ticket purchase flow reflect backend data; QR ticket view shows live booking info.
*   **Staff Tools**: Staff dashboard and QR scanner support real-time attendance tracking.

## 🔄 Recent Updates

The latest iteration focused on organizer productivity and data consistency. Highlights include:

*   Unified event editing and creation flows with shared form state.
*   Working action buttons in the organizer dashboard (view, edit, settings) that navigate or prefill configuration panels.
*   Analytics tab exports (sales, attendees, analytics summary) delivered as client-side CSV downloads.
*   Settings tab now persists organizer profile data (organization name, email, contact number) and default event values to `localStorage`.
*   Event details page automatically reflects updated organizer profile information so attendees always see accurate contacts.

See [PROJECT_UPDATE.md](./PROJECT_UPDATE.md) for a detailed changelog and verification notes.

## 👥 User Roles

*   **Attendee**: Browse events, purchase tickets, view QR codes.
*   **Organizer**: Create and manage events, edit event details, update organizer profile, view sales analytics, export reports.
*   **Staff**: Scan QR codes for event entry verification.

## ✅ Smoke Tests

Once both servers are running locally:

1. Sign in as an organizer via `/auth`.
2. Navigate to the organizer dashboard and open an existing event's **Edit** action. Confirm the form is pre-populated and saving updates the dashboard metrics.
3. Update profile details in **Settings** and verify the changes appear immediately on the event details page (`/events/:id`).
4. Export a CSV report from the Analytics tab and inspect the downloaded file.

For more regression steps and screenshots, refer to [PROJECT_UPDATE.md](./PROJECT_UPDATE.md).

## 📄 License

This project is licensed under the MIT License.
