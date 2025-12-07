/**
 * API Service for communicating with Spring Boot backend
 * Handles all HTTP requests to the backend server
 */
const API_BASE_URL = 'http://localhost:8080/api';

class ApiService {
  
  /**
   * Generic request method to handle all API calls
   * @param {string} endpoint - The API endpoint to call
   * @param {object} options - Fetch API options
   * @returns {Promise} - Parsed JSON response
   */
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    // Default configuration for all requests
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    };

    try {
      console.log(`Making API request to: ${url}`);
      
      const response = await fetch(url, config);
      
      // Handle non-successful HTTP responses
      if (!response.ok) {
        // Try to extract error message from response body
        const errorText = await response.text();
        throw new Error(errorText || `HTTP error! status: ${response.status}`);
      }
      
      // Parse and return JSON response for successful requests
      return await response.json();
      
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  /**
   * Register a new user with the backend
   * @param {object} userData - User registration data
   * @returns {Promise} - Authentication response with user data
   */
  async signup(userData) {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  /**
   * Authenticate an existing user
   * @param {object} credentials - User login credentials
   * @returns {Promise} - Authentication response with user data
   */
  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  /**
   * Get user profile data
   * @param {string} userId - Unique user identifier
   * @returns {Promise} - User profile data
   */
  async getUserProfile(userId) {
    return this.request(`/users/${userId}`);
  }

  async getEvents() {
    return this.request('/events');
  }

  async createEvent(eventData) {
    return this.request('/events', {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  }

  async getEvent(eventId, options = {}) {
    const { trackView = false } = options;
    
    const query = trackView ? '?trackView=true' : '?trackView=false';
    return this.request(`/events/${eventId}${query}`);
  }

  async updateEvent(eventId, eventData) {
    return this.request(`/events/${eventId}`, {
      method: 'PUT',
      body: JSON.stringify(eventData),
    });
  }

  async bookTickets(payload) {
    return this.request('/tickets/book', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async getTicket(ticketId) {
    return this.request(`/tickets/${ticketId}`);
  }

  async scanTicket(payload) {
    return this.request('/tickets/scan', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async manualVerifyTicket(payload) {
    return this.request('/tickets/manual-verify', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async bulkCheckIn(payload) {
    return this.request('/tickets/bulk-check-in', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async getAttendeeDashboard(userId) {
    return this.request(`/dashboard/attendee/${userId}`);
  }

  async getOrganizerDashboard(userId) {
    return this.request(`/dashboard/organizer/${userId}`);
  }

  async getStaffDashboard(eventId) {
    return this.request(`/dashboard/staff?eventId=${eventId}`);
  }

  // Additional API methods can be added here as needed
  // For events, tickets, etc.
}

// Create and export a singleton instance of the API service
export const apiService = new ApiService();