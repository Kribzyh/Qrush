import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../App';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Input } from '../components/ui/input';
import {
  QrCode,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Scan,
  AlertCircle,
  Calendar,
  MapPin
} from 'lucide-react';
import { apiService } from '../services/api';
import { toast } from 'sonner';

const BULK_PLACEHOLDER = [
  'Enter ticket numbers, one per line',
  'TCK-001234',
  'TCK-002345',
  'TCK-003456'
].join('\n');

const StaffDashboard = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [dashboard, setDashboard] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboard = useCallback(async (eventId, { showSpinner = true } = {}) => {
    if (!eventId) {
      setDashboard(null);
      return;
    }

    try {
      if (showSpinner) {
        setLoading(true);
      }
      const data = await apiService.getStaffDashboard(eventId);
      setDashboard(data);
      setError(null);
    } catch (err) {
      console.error('Failed to load staff dashboard data', err);
      setError(err.message || 'Failed to load staff dashboard data');
      toast.error('Unable to load entry insights for the selected event.');
    } finally {
      if (showSpinner) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const initialise = async () => {
      try {
        setLoading(true);
        const fetchedEvents = await apiService.getEvents();
        setEvents(fetchedEvents);
        const defaultEventId = fetchedEvents[0]?.eventID ?? null;
        setSelectedEventId(defaultEventId);
        if (defaultEventId) {
          await fetchDashboard(defaultEventId, { showSpinner: false });
        } else {
          setDashboard(null);
        }
        setError(null);
      } catch (err) {
        console.error('Failed to initialise staff dashboard', err);
        setError(err.message || 'Failed to load events');
        toast.error('Unable to load events for staff dashboard.');
      } finally {
        setLoading(false);
      }
    };

    initialise();
  }, [fetchDashboard]);

  const handleEventChange = async (event) => {
    const value = event.target.value;
    const parsed = value ? Number(value) : null;
    setSelectedEventId(parsed);
    await fetchDashboard(parsed);
  };

  const formatDate = (value) => {
    if (!value) {
      return 'TBD';
    }
    return new Date(value).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTimeRange = (start, end) => {
    if (!start || !end) {
      return 'Schedule to be confirmed';
    }
    const startDate = new Date(start);
    const endDate = new Date(end);
    return `${startDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} - ${endDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
  };

  const formatTime = (date) => {
    if (!date) {
      return '--:--';
    }
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'valid':
      case 'checked-in':
        return 'bg-green-100 text-green-700';
      case 'duplicate':
        return 'bg-red-100 text-red-700';
      case 'invalid':
        return 'bg-gray-200 text-gray-700';
      case 'expired':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'valid':
      case 'checked-in':
        return <CheckCircle className="w-4 h-4" />;
      case 'duplicate':
        return <XCircle className="w-4 h-4" />;
      case 'invalid':
        return <AlertCircle className="w-4 h-4" />;
      case 'expired':
        return <Clock className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const scannedTickets = useMemo(() => {
    return (dashboard?.recentScans ?? []).map((scan) => ({
      ...scan,
      scanTime: scan.scanTime ? new Date(scan.scanTime) : null,
      attendeeEmail: scan.attendeeEmail ?? scan.email ?? ''
    }));
  }, [dashboard]);

  const filteredTickets = scannedTickets.filter((ticket) =>
    (ticket.ticketNumber || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (ticket.attendeeName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (ticket.attendeeEmail || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const validScans = scannedTickets.filter((ticket) => {
    const status = (ticket.status || '').toLowerCase();
    return status.includes('valid') || status.includes('checked');
  }).length;

  const invalidScans = Math.max(scannedTickets.length - validScans, 0);
  const successRate = validScans + invalidScans === 0 ? 0 : Math.round((validScans / (validScans + invalidScans)) * 100);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto" />
          <p className="mt-4 text-gray-600">Loading event operations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <QrCode className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Staff dashboard unavailable</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()} className="gradient-orange text-white">
            Refresh
          </Button>
        </div>
      </div>
    );
  }

  const currentEvent = dashboard?.currentEvent ?? null;
  const totalCapacity = dashboard?.totalCapacity ?? 0;
  const ticketsSold = dashboard?.ticketsSold ?? 0;
  const checkedIn = dashboard?.checkedIn ?? validScans;
  const pending = dashboard?.pending ?? Math.max(ticketsSold - checkedIn, 0);
  const issueCount = invalidScans;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Staff Dashboard</h1>
            <p className="text-xl text-gray-600">Welcome, {user.name}. Manage event entry and scan tickets.</p>
          </div>
          <Link to="/scan">
            <Button className="gradient-orange text-white mt-4 sm:mt-0">
              <Scan className="w-5 h-5 mr-2" />
              Open QR Scanner
            </Button>
          </Link>
        </div>

        {events.length > 0 ? (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Event</label>
            <select
              value={selectedEventId ?? ''}
              onChange={handleEventChange}
              className="w-full max-w-sm p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {events.map((event) => (
                <option key={event.eventID} value={event.eventID}>
                  {event.name}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <Card className="mb-8">
            <CardContent className="py-8 text-center text-gray-600">
              No events available. Please ensure events are assigned to your staff role.
            </CardContent>
          </Card>
        )}

        {currentEvent && (
          <Card className="mb-8 border-l-4 border-l-orange-500">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">Current Event: {currentEvent.title}</h2>
                  <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-orange-500" />
                      <span>{formatDate(currentEvent.eventStart)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-orange-500" />
                      <span>{formatTimeRange(currentEvent.eventStart, currentEvent.eventEnd)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-orange-500" />
                      <span>{currentEvent.location || 'Location TBC'}</span>
                    </div>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700">
                  <Users className="w-3 h-3 mr-1" />
                  Active Event
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {!currentEvent && events.length > 0 && (
          <Card className="mb-8">
            <CardContent className="py-8 text-center text-gray-600">
              Select an event to see live check-in metrics.
            </CardContent>
          </Card>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="stats-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Capacity</p>
                  <p className="text-3xl font-bold text-gray-900">{totalCapacity}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="stats-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Checked In</p>
                  <p className="text-3xl font-bold text-gray-900">{checkedIn}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="stats-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Pending Check-ins</p>
                  <p className="text-3xl font-bold text-gray-900">{pending}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="stats-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Issues Found</p>
                  <p className="text-3xl font-bold text-gray-900">{issueCount}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="scanner" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="scanner">QR Scanner</TabsTrigger>
            <TabsTrigger value="history">Scan History</TabsTrigger>
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
          </TabsList>

          <TabsContent value="scanner" className="space-y-6">
            <Card className="p-8 text-center">
              <CardContent>
                <div className="max-w-md mx-auto space-y-6">
                  <div className="w-32 h-32 gradient-orange rounded-full flex items-center justify-center mx-auto">
                    <QrCode className="w-16 h-16 text-white" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">QR Code Scanner Ready</h3>
                    <p className="text-gray-600">Click the button below to open the camera and start scanning QR codes</p>
                  </div>

                  <Link to="/scan">
                    <Button className="gradient-orange text-white text-lg px-8 py-4 h-auto">
                      <Scan className="w-6 h-6 mr-3" />
                      Open Camera Scanner
                    </Button>
                  </Link>

                  <div className="text-sm text-gray-500">
                    <p>Make sure attendees have their QR codes ready for quick scanning</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center p-6">
                <div className="text-3xl font-bold text-green-600 mb-2">{validScans}</div>
                <div className="text-sm text-gray-600">Valid Scans Today</div>
              </Card>
              <Card className="text-center p-6">
                <div className="text-3xl font-bold text-red-600 mb-2">{issueCount}</div>
                <div className="text-sm text-gray-600">Issues Detected</div>
              </Card>
              <Card className="text-center p-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">{successRate}%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">Recent Scans</h2>
              <div className="relative max-w-xs">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search tickets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-3">
              {filteredTickets.map((ticket) => (
                <Card key={ticket.ticketNumber || ticket.id || ticket.scanId} className="hover-lift">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                          <QrCode className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{ticket.attendeeName || 'Guest'}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="font-mono">{ticket.ticketNumber || 'Ticket TBD'}</span>
                            <span>•</span>
                            <span>{ticket.attendeeEmail || 'no-email@provided.com'}</span>
                            <span>•</span>
                            <span>{ticket.gate || 'Gate N/A'}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-500">{formatTime(ticket.scanTime)}</span>
                        <Badge className={`${getStatusColor(ticket.status)} flex items-center space-x-1`}>
                          {getStatusIcon(ticket.status)}
                          <span className="capitalize">{ticket.status || 'pending'}</span>
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredTickets.length === 0 && (
              <div className="text-center py-16">
                <QrCode className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">{searchTerm ? 'No matching scans found' : 'No scans yet'}</h3>
                <p className="text-gray-600">{searchTerm ? 'Try adjusting your search terms' : 'Start scanning QR codes to populate history.'}</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="manual" className="space-y-6">
            <Card className="p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle>Manual Ticket Verification</CardTitle>
                <p className="text-gray-600">Enter ticket number manually if QR scanning is not available.</p>
              </CardHeader>
              <CardContent className="px-0">
                <div className="max-w-md space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ticket Number</label>
                    <Input placeholder="e.g., TCK-001234" className="font-mono" />
                  </div>
                  <Button className="gradient-orange text-white">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Verify Ticket
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle>Bulk Check-in</CardTitle>
                <p className="text-gray-600">Check in multiple attendees at once using a list.</p>
              </CardHeader>
              <CardContent className="px-0">
                <div className="space-y-4">
                  <textarea
                    className="w-full h-32 p-3 border border-gray-300 rounded-lg font-mono text-sm"
                    placeholder={BULK_PLACEHOLDER}
                  />
                  <Button className="gradient-orange text-white">
                    <Users className="w-4 h-4 mr-2" />
                    Bulk Check-in
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StaffDashboard;
