import { useState, useEffect } from 'react';
import { Check, X, Clock, Mail, MapPin, Briefcase, Building } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { matchingService } from '../services/matchingService';

interface MentorshipRequest {
  id: string;
  message: string;
  status: string;
  created_at: string;
  responded_at: string | null;
  founder?: {
    full_name: string;
    photo_url: string | null;
    bio: string | null;
    location: string | null;
  };
  mentor?: {
    full_name: string;
    photo_url: string | null;
    bio: string | null;
    title: string | null;
    organization: string | null;
    location: string | null;
  };
  startup_profile?: {
    startup_name: string;
    sector: string;
    stage: string;
    description: string;
  };
}

interface MentorshipRequestsProps {
  userId: string;
  role: 'founder' | 'mentor';
}

export default function MentorshipRequests({ userId, role }: MentorshipRequestsProps) {
  const [requests, setRequests] = useState<MentorshipRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'declined'>('all');
  const [responding, setResponding] = useState<string | null>(null);

  useEffect(() => {
    loadRequests();
  }, [userId, role]);

  async function loadRequests() {
    setLoading(true);
    try {
      let query = supabase
        .from('mentorship_requests')
        .select(`
          *,
          founder:founder_id (full_name, photo_url, bio, location),
          mentor:mentor_id (full_name, photo_url, bio, title, organization, location)
        `);

      if (role === 'mentor') {
        query = query.eq('mentor_id', userId);
      } else {
        query = query.eq('founder_id', userId);
      }

      query = query.order('created_at', { ascending: false });

      const { data: requestsData, error } = await query;

      if (error) throw error;

      if (requestsData && role === 'mentor') {
        const enrichedRequests = await Promise.all(
          requestsData.map(async (req) => {
            const { data: startup } = await supabase
              .from('startup_profiles')
              .select('startup_name, sector, stage, description')
              .eq('user_id', req.founder_id)
              .maybeSingle();

            return {
              ...req,
              startup_profile: startup
            };
          })
        );
        setRequests(enrichedRequests as MentorshipRequest[]);
      } else {
        setRequests(requestsData as MentorshipRequest[]);
      }
    } catch (error) {
      console.error('Error loading requests:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleResponse(requestId: string, status: 'accepted' | 'declined') {
    setResponding(requestId);
    try {
      await matchingService.respondToRequest(requestId, status);
      await loadRequests();
    } catch (error) {
      console.error('Error responding to request:', error);
      alert('Failed to respond to request');
    } finally {
      setResponding(null);
    }
  }

  const filteredRequests = requests.filter(req =>
    filter === 'all' || req.status === filter
  );

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      accepted: 'bg-green-100 text-green-800',
      declined: 'bg-red-100 text-red-800',
      cancelled: 'bg-gray-100 text-gray-800'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles] || styles.pending}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {role === 'mentor' ? 'Mentorship Requests' : 'My Requests'}
        </h2>
        <div className="flex gap-2">
          {['all', 'pending', 'accepted', 'declined'].map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption as typeof filter)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === filterOption
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {filteredRequests.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl">
          <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-xl text-gray-600">No {filter !== 'all' ? filter : ''} requests</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRequests.map((request) => {
            const person = role === 'mentor' ? request.founder : request.mentor;

            return (
              <div key={request.id} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <img
                      src={person?.photo_url || 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=100'}
                      alt={person?.full_name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{person?.full_name}</h3>
                          {role === 'mentor' && request.startup_profile && (
                            <div className="flex items-center gap-2 mt-1">
                              <Building className="w-4 h-4 text-gray-500" />
                              <span className="text-sm font-medium text-gray-700">
                                {request.startup_profile.startup_name}
                              </span>
                              <span className="px-2 py-0.5 bg-teal-100 text-teal-700 text-xs font-medium rounded">
                                {request.startup_profile.sector}
                              </span>
                            </div>
                          )}
                          {role === 'founder' && request.mentor && (
                            <p className="text-sm text-gray-600 mt-1">{request.mentor.title}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          {getStatusBadge(request.status)}
                          <span className="text-sm text-gray-500">{formatDate(request.created_at)}</span>
                        </div>
                      </div>

                      {role === 'mentor' && request.startup_profile && (
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {request.startup_profile.description}
                        </p>
                      )}

                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        {person?.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{person.location}</span>
                          </div>
                        )}
                        {role === 'mentor' && request.startup_profile && (
                          <div className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            <span className="capitalize">{request.startup_profile.stage} stage</span>
                          </div>
                        )}
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Message:</p>
                        <p className="text-gray-700">{request.message}</p>
                      </div>

                      {role === 'mentor' && request.status === 'pending' && (
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleResponse(request.id, 'accepted')}
                            disabled={responding === request.id}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 transition-colors"
                          >
                            <Check className="w-5 h-5" />
                            Accept
                          </button>
                          <button
                            onClick={() => handleResponse(request.id, 'declined')}
                            disabled={responding === request.id}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 transition-colors"
                          >
                            <X className="w-5 h-5" />
                            Decline
                          </button>
                        </div>
                      )}

                      {request.status !== 'pending' && request.responded_at && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>
                            {request.status === 'accepted' ? 'Accepted' : 'Declined'} on{' '}
                            {new Date(request.responded_at).toLocaleDateString()}
                          </span>
                        </div>
                      )}

                      {role === 'founder' && request.status === 'accepted' && (
                        <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                          <p className="text-sm text-green-800">
                            Your mentorship request has been accepted! You can now schedule sessions with this mentor from your dashboard.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
