/**
 * Mock data for the application.
 * This file mirrors the backend entity structures to ensure smooth data flow.
 */

export const mockEvents = [
  {
    eventID: 1,
    name: "Tech Conference 2024",
    description: "Annual technology conference featuring the latest innovations in AI, blockchain, and web development.",
    startDate: "2024-03-15T09:00:00",
    endDate: "2024-03-15T17:00:00",
    location: "San Francisco Convention Center",
    category: "technology",
    ticketPrice: 299.0,
    capacity: 500,
    registered: 387,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1699862731387-d40f6908ca4e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHxldmVudCUyMHRpY2tldGluZ3xlbnwwfHx8fDE3NTg0NjM0MDd8MA&ixlib=rb-4.1.0&q=85",
    organizer: "TechEvents Inc."
  },
  {
    eventID: 2,
    name: "Summer Music Festival",
    description: "Three days of amazing music featuring top artists from around the world.",
    startDate: "2024-06-20T12:00:00",
    endDate: "2024-06-22T23:00:00",
    location: "Golden Gate Park",
    category: "music",
    ticketPrice: 150.0,
    capacity: 2000,
    registered: 1650,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1699862731387-d40f6908ca4e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHxldmVudCUyMHRpY2tldGluZ3xlbnwwfHx8fDE3NTg0NjM0MDd8MA&ixlib=rb-4.1.0&q=85",
    organizer: "Music Lovers Co."
  },
  {
    eventID: 3,
    name: "Business Networking Event",
    description: "Connect with industry professionals and grow your network.",
    startDate: "2024-04-10T18:00:00",
    endDate: "2024-04-10T21:00:00",
    location: "Downtown Business Center",
    category: "business",
    ticketPrice: 50.0,
    capacity: 150,
    registered: 89,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1699862731387-d40f6908ca4e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHxldmVudCUyMHRpY2tldGluZ3xlbnwwfHx8fDE3NTg0NjM0MDd8MA&ixlib=rb-4.1.0&q=85",
    organizer: "Business Network Pro"
  },
  {
    eventID: 4,
    name: "Art Gallery Opening",
    description: "Grand opening of contemporary art exhibition featuring local artists.",
    startDate: "2024-05-05T19:00:00",
    endDate: "2024-05-05T22:00:00",
    location: "Modern Art Gallery",
    category: "art",
    ticketPrice: 0.0,
    capacity: 100,
    registered: 67,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1699862731387-d40f6908ca4e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHxldmVudCUyMHRpY2tldGluZ3xlbnwwfHx8fDE3NTg0NjM0MDd8MA&ixlib=rb-4.1.0&q=85",
    organizer: "Art Collective"
  },
  {
    eventID: 5,
    name: "Food & Wine Tasting",
    description: "Experience exquisite cuisine paired with premium wines from local vineyards.",
    startDate: "2024-04-25T17:00:00",
    endDate: "2024-04-25T20:00:00",
    location: "Riverside Restaurant",
    category: "food",
    ticketPrice: 120.0,
    capacity: 80,
    registered: 73,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1699862731387-d40f6908ca4e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHxldmVudCUyMHRpY2tldGluZ3xlbnwwfHx8fDE3NTg0NjM0MDd8MA&ixlib=rb-4.1.0&q=85",
    organizer: "Culinary Experts"
  },
  {
    eventID: 6,
    name: "Startup Pitch Competition",
    description: "Watch promising startups pitch their ideas to top investors.",
    startDate: "2024-03-30T10:00:00",
    endDate: "2024-03-30T14:00:00",
    location: "Innovation Hub",
    category: "business",
    ticketPrice: 25.0,
    capacity: 200,
    registered: 156,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1699862731387-d40f6908ca4e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHxldmVudCUyMHRpY2tldGluZ3xlbnwwfHx8fDE3NTg0NjM0MDd8MA&ixlib=rb-4.1.0&q=85",
    organizer: "Startup Alliance"
  }
];

export const mockUsers = [
  {
    userID: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "ATTENDEE",
    contact: "1234567890"
  },
  {
    userID: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "ORGANIZER",
    contact: "0987654321"
  }
];

export const mockTickets = [
  {
    ticketID: 1,
    userID: 1,
    eventID: 1,
    qrCode: "QR_CODE_DATA_1",
    price: 299.0,
    purchaseDate: "2024-02-15T10:30:00",
    ticketType: "REGULAR",
    status: "ACTIVE"
  }
];
