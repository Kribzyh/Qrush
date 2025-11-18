import React, { useState, useMemo } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import EventCard from '../components/EventCard';
import { useEvents } from '../hooks/useEvents';
import { 
  Search, 
  Calendar, 
  Filter,
  Zap,
  Music,
  Users2,
  Palette,
  UtensilsCrossed
} from 'lucide-react';

const CATEGORIES = [
  { id: 'all', name: 'All Events', icon: Filter, color: 'bg-gray-100 text-gray-700' },
  { id: 'technology', name: 'Technology', icon: Zap, color: 'bg-blue-100 text-blue-700' },
  { id: 'music', name: 'Music', icon: Music, color: 'bg-purple-100 text-purple-700' },
  { id: 'business', name: 'Business', icon: Users2, color: 'bg-green-100 text-green-700' },
  { id: 'art', name: 'Visual Arts', icon: Palette, color: 'bg-pink-100 text-pink-700' },
  { id: 'food', name: 'Food & Drink', icon: UtensilsCrossed, color: 'bg-orange-100 text-orange-700' }
];

const EventsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { loading, error, filterEvents } = useEvents();

  const filteredEvents = useMemo(() => 
    filterEvents(searchTerm, selectedCategory),
    [filterEvents, searchTerm, selectedCategory]
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Amazing Events
          </h1>
          <p className="text-xl text-gray-600">
            Find and book tickets for the most exciting events in your area
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                  selectedCategory === category.id 
                    ? 'bg-black text-white shadow-sm'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-400'
                }`}
              >
                <category.icon className="w-5 h-5" />
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.eventID} event={event} />
          ))}
        </div>

        {/* No Results */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-16">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No events found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or browse all events
            </p>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Event Count */}
        {filteredEvents.length > 0 && (
          <div className="text-center mt-8 text-gray-600">
            Showing {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;