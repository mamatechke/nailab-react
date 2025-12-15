import { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, Star, DollarSign, Filter, X, Send, Sparkles } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { matchingService, type MatchScore, type MentorProfile } from '../services/matchingService';

const INDUSTRIES = [
  'Agritech', 'Healthtech', 'Fintech', 'Edutech', 'Mobility & Logisticstech',
  'E-commerce & Retailtech', 'SaaS', 'Creative & Mediatech', 'Cleantech',
  'AI & ML', 'Robotics', 'Mobiletech'
];

const EXPERTISE_AREAS = [
  'Business model refinement', 'Product-market fit', 'Fundraising',
  'Marketing and branding', 'Product development', 'Sales',
  'Team building', 'Legal guidance', 'Market expansion'
];

export default function BrowseMentors() {
  const { user, profile } = useAuth();
  const [mentors, setMentors] = useState<MentorProfile[]>([]);
  const [matches, setMatches] = useState<MatchScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'all' | 'matched'>('matched');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<MentorProfile | null>(null);
  const [requestMessage, setRequestMessage] = useState('');
  const [sending, setSending] = useState(false);

  const [filters, setFilters] = useState({
    sector: '',
    expertise: [] as string[],
    location: '',
    proBono: undefined as boolean | undefined
  });

  useEffect(() => {
    loadMentors();
  }, [user, viewMode, filters]);

  async function loadMentors() {
    if (!user) return;

    setLoading(true);
    try {
      if (viewMode === 'matched' && profile?.role === 'founder') {
        const matchedMentors = await matchingService.findMatches(user.id, 20);
        setMatches(matchedMentors);
        setMentors([]);
      } else {
        const allMentors = await matchingService.getAllMentors(filters);
        setMentors(allMentors);
        setMatches([]);
      }
    } catch (error) {
      console.error('Error loading mentors:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSendRequest() {
    if (!selectedMentor || !requestMessage.trim() || !user) return;

    setSending(true);
    try {
      await matchingService.sendMentorshipRequest(
        user.id,
        selectedMentor.id,
        requestMessage
      );
      setSelectedMentor(null);
      setRequestMessage('');
      alert('Request sent successfully!');
      loadMentors();
    } catch (error) {
      console.error('Error sending request:', error);
      alert('Failed to send request');
    } finally {
      setSending(false);
    }
  }

  const toggleExpertise = (exp: string) => {
    setFilters(prev => ({
      ...prev,
      expertise: prev.expertise.includes(exp)
        ? prev.expertise.filter(e => e !== exp)
        : [...prev.expertise, exp]
    }));
  };

  const clearFilters = () => {
    setFilters({
      sector: '',
      expertise: [],
      location: '',
      proBono: undefined
    });
  };

  const hasActiveFilters = filters.sector || filters.expertise.length > 0 ||
                          filters.location || filters.proBono !== undefined;

  const MentorCard = ({ mentor, matchScore, matchReasons }: {
    mentor: MentorProfile;
    matchScore?: number;
    matchReasons?: string[];
  }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4">
          <img
            src={mentor.photo_url || 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=100'}
            alt={mentor.full_name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900">{mentor.full_name}</h3>
            <p className="text-sm text-gray-600">{mentor.title}</p>
            {mentor.organization && (
              <p className="text-xs text-gray-500 mt-1">{mentor.organization}</p>
            )}
          </div>
        </div>
        {matchScore !== undefined && (
          <div className="flex items-center gap-1 px-3 py-1 bg-teal-100 text-teal-700 rounded-full">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-bold">{matchScore}%</span>
          </div>
        )}
      </div>

      <p className="text-gray-700 text-sm mb-4 line-clamp-3">{mentor.bio}</p>

      {matchReasons && matchReasons.length > 0 && (
        <div className="mb-4 p-3 bg-teal-50 rounded-lg border border-teal-100">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span className="text-sm font-semibold text-teal-900">Why this mentor?</span>
          </div>
          <ul className="space-y-1">
            {matchReasons.slice(0, 3).map((reason, idx) => (
              <li key={idx} className="text-xs text-teal-800 flex items-center gap-2">
                <span className="w-1 h-1 bg-teal-600 rounded-full"></span>
                {reason}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
        {mentor.location && (
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{mentor.location}</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <Briefcase className="w-4 h-4" />
          <span>{mentor.years_experience}+ years</span>
        </div>
        {mentor.rate_per_hour !== undefined && (
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            <span>{mentor.pro_bono ? 'Pro bono' : `$${mentor.rate_per_hour}/hr`}</span>
          </div>
        )}
      </div>

      {mentor.sectors && mentor.sectors.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {mentor.sectors.slice(0, 3).map((sector) => (
            <span key={sector} className="px-3 py-1 bg-teal-100 text-teal-700 text-xs font-medium rounded-full">
              {sector}
            </span>
          ))}
          {mentor.sectors.length > 3 && (
            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
              +{mentor.sectors.length - 3} more
            </span>
          )}
        </div>
      )}

      <button
        onClick={() => setSelectedMentor(mentor)}
        className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors"
      >
        Request Mentorship
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <section className="py-20 bg-gradient-to-br from-teal-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 text-center">
            Find Your Mentor
          </h1>
          <p className="text-xl text-gray-700 text-center max-w-3xl mx-auto mb-8">
            Connect with experienced entrepreneurs and business leaders
          </p>

          {profile?.role === 'founder' && (
            <div className="max-w-2xl mx-auto mb-6">
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => setViewMode('matched')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    viewMode === 'matched'
                      ? 'bg-white text-teal-600 shadow-lg'
                      : 'text-gray-600 hover:bg-white/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    Recommended for You
                  </div>
                </button>
                <button
                  onClick={() => setViewMode('all')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    viewMode === 'all'
                      ? 'bg-white text-teal-600 shadow-lg'
                      : 'text-gray-600 hover:bg-white/50'
                  }`}
                >
                  Browse All Mentors
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="py-8 border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                showFilters
                  ? 'border-teal-600 text-teal-600 bg-teal-50'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              <Filter className="w-5 h-5" />
              Filters
              {hasActiveFilters && (
                <span className="px-2 py-0.5 bg-teal-600 text-white text-xs rounded-full">
                  {(filters.sector ? 1 : 0) + filters.expertise.length + (filters.location ? 1 : 0) + (filters.proBono !== undefined ? 1 : 0)}
                </span>
              )}
            </button>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <X className="w-4 h-4" />
                Clear filters
              </button>
            )}
          </div>

          {showFilters && (
            <div className="mt-4 p-6 bg-gray-50 rounded-xl space-y-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                  <select
                    value={filters.sector}
                    onChange={(e) => setFilters({ ...filters, sector: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">All Industries</option>
                    {INDUSTRIES.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                    placeholder="e.g., Kenya, Lagos"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rate</label>
                  <select
                    value={filters.proBono === undefined ? '' : filters.proBono ? 'pro_bono' : 'paid'}
                    onChange={(e) => setFilters({
                      ...filters,
                      proBono: e.target.value === '' ? undefined : e.target.value === 'pro_bono'
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">All</option>
                    <option value="pro_bono">Pro Bono Only</option>
                    <option value="paid">Paid Sessions</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expertise Areas</label>
                <div className="flex flex-wrap gap-2">
                  {EXPERTISE_AREAS.map(exp => (
                    <button
                      key={exp}
                      onClick={() => toggleExpertise(exp)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                        filters.expertise.includes(exp)
                          ? 'bg-teal-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {exp}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
            </div>
          ) : (
            <>
              {viewMode === 'matched' && matches.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {matches.map((match) => (
                    <MentorCard
                      key={match.mentor.id}
                      mentor={match.mentor}
                      matchScore={match.score}
                      matchReasons={match.matchReasons}
                    />
                  ))}
                </div>
              )}

              {viewMode === 'all' && mentors.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mentors.map((mentor) => (
                    <MentorCard key={mentor.id} mentor={mentor} />
                  ))}
                </div>
              )}

              {((viewMode === 'matched' && matches.length === 0) || (viewMode === 'all' && mentors.length === 0)) && (
                <div className="text-center py-12">
                  <p className="text-xl text-gray-600">No mentors found</p>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="mt-4 text-teal-600 hover:text-teal-700 font-medium"
                    >
                      Clear filters
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {selectedMentor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-start justify-between">
              <div className="flex items-start gap-4">
                <img
                  src={selectedMentor.photo_url || 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=100'}
                  alt={selectedMentor.full_name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedMentor.full_name}</h2>
                  <p className="text-gray-600">{selectedMentor.title}</p>
                  <p className="text-sm text-gray-500">{selectedMentor.organization}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedMentor(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">About</h3>
                <p className="text-gray-700">{selectedMentor.bio}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Request Mentorship</h3>
                <textarea
                  value={requestMessage}
                  onChange={(e) => setRequestMessage(e.target.value)}
                  rows={6}
                  placeholder="Introduce yourself and explain why you'd like to connect with this mentor..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedMentor(null)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendRequest}
                  disabled={!requestMessage.trim() || sending}
                  className="flex-1 px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  {sending ? 'Sending...' : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Request
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
