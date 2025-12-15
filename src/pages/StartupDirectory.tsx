import { useState, useEffect } from 'react';
import { Search, MapPin, Users, TrendingUp, DollarSign, Briefcase, Filter, X, ExternalLink } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';

interface Startup {
  id: string;
  user_id: string;
  startup_name: string;
  logo_url: string | null;
  description: string | null;
  sector: string | null;
  stage: string | null;
  location: string | null;
  website_url: string | null;
  team_size: number;
  founded_year: number | null;
  target_market: string | null;
  value_proposition: string | null;
  funding_stage: string | null;
  funding_raised: number | null;
  mentorship_areas: string[] | null;
  challenge_details: string | null;
  founder?: {
    full_name: string;
    photo_url: string | null;
  };
}

const INDUSTRIES = [
  'Agritech', 'Healthtech', 'Fintech', 'Edutech', 'Mobility & Logisticstech',
  'E-commerce & Retailtech', 'SaaS', 'Creative & Mediatech', 'Cleantech',
  'AI & ML', 'Robotics', 'Mobiletech'
];

const STAGES = [
  { value: 'idea', label: 'Idea Stage' },
  { value: 'mvp', label: 'Early Stage' },
  { value: 'growth', label: 'Growth Stage' },
  { value: 'scale', label: 'Scaling Stage' }
];

const FUNDING_STAGES = [
  'Bootstrapped', 'Friends & Family', 'Angel', 'Pre-seed', 'Seed', 'Series A', 'Series B+'
];

export default function StartupDirectory() {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);

  const [filters, setFilters] = useState({
    sector: '',
    stage: '',
    location: ''
  });

  useEffect(() => {
    fetchStartups();
  }, []);

  async function fetchStartups() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('startup_profiles')
        .select(`
          *,
          founder:user_id (full_name, photo_url)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setStartups(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredStartups = startups.filter(startup => {
    const matchesSearch =
      startup.startup_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      startup.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      startup.sector?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSector = !filters.sector || startup.sector === filters.sector;
    const matchesStage = !filters.stage || startup.stage === filters.stage;
    const matchesLocation = !filters.location ||
      startup.location?.toLowerCase().includes(filters.location.toLowerCase());

    return matchesSearch && matchesSector && matchesStage && matchesLocation;
  });

  const clearFilters = () => {
    setFilters({ sector: '', stage: '', location: '' });
  };

  const hasActiveFilters = filters.sector || filters.stage || filters.location;

  const getStageLabel = (stage: string | null) => {
    if (!stage) return '';
    const stageObj = STAGES.find(s => s.value === stage);
    return stageObj?.label || stage;
  };

  const getFundingLabel = (funding: string | null) => {
    if (!funding) return '';
    const labels: Record<string, string> = {
      'bootstrapped': 'Bootstrapped',
      'friends_family': 'Friends & Family',
      'angel': 'Angel',
      'pre_seed': 'Pre-seed',
      'seed': 'Seed',
      'series_a': 'Series A',
      'series_b_plus': 'Series B+'
    };
    return labels[funding] || funding;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <section className="py-20 bg-gradient-to-br from-teal-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 text-center">
            Startup Directory
          </h1>
          <p className="text-xl text-gray-700 text-center max-w-3xl mx-auto mb-8">
            Discover innovative startups building the future of Africa
          </p>

          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, sector, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 shadow-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>
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
                  {(filters.sector ? 1 : 0) + (filters.stage ? 1 : 0) + (filters.location ? 1 : 0)}
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

            <div className="ml-auto text-sm text-gray-600">
              {filteredStartups.length} {filteredStartups.length === 1 ? 'startup' : 'startups'}
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 p-6 bg-gray-50 rounded-xl">
              <div className="grid md:grid-cols-3 gap-4">
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stage</label>
                  <select
                    value={filters.stage}
                    onChange={(e) => setFilters({ ...filters, stage: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">All Stages</option>
                    {STAGES.map(stage => (
                      <option key={stage.value} value={stage.value}>{stage.label}</option>
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
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStartups.map((startup) => (
                  <div
                    key={startup.id}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer"
                    onClick={() => setSelectedStartup(startup)}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <img
                        src={startup.logo_url || 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?w=100'}
                        alt={startup.startup_name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900">{startup.startup_name}</h3>
                        {startup.stage && (
                          <span className="inline-block px-2 py-1 bg-teal-100 text-teal-700 text-xs font-medium rounded mt-1">
                            {getStageLabel(startup.stage)}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-gray-700 text-sm mb-4 line-clamp-3">{startup.description}</p>

                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      {startup.sector && (
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4" />
                          <span>{startup.sector}</span>
                        </div>
                      )}
                      {startup.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{startup.location}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{startup.team_size} team member{startup.team_size !== 1 ? 's' : ''}</span>
                      </div>
                      {startup.funding_stage && (
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4" />
                          <span>{getFundingLabel(startup.funding_stage)}</span>
                        </div>
                      )}
                    </div>

                    <button className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors">
                      View Details
                    </button>
                  </div>
                ))}
              </div>

              {filteredStartups.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-xl text-gray-600">No startups found</p>
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

      {selectedStartup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-4xl w-full my-8">
            <div className="p-6 border-b border-gray-200 flex items-start justify-between">
              <div className="flex items-start gap-4">
                <img
                  src={selectedStartup.logo_url || 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?w=100'}
                  alt={selectedStartup.startup_name}
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">{selectedStartup.startup_name}</h2>
                  <div className="flex items-center gap-2 mt-2">
                    {selectedStartup.sector && (
                      <span className="px-3 py-1 bg-teal-100 text-teal-700 text-sm font-medium rounded-full">
                        {selectedStartup.sector}
                      </span>
                    )}
                    {selectedStartup.stage && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                        {getStageLabel(selectedStartup.stage)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedStartup(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {selectedStartup.founder && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedStartup.founder.photo_url || 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=100'}
                      alt={selectedStartup.founder.full_name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm text-gray-600">Founded by</p>
                      <p className="font-semibold text-gray-900">{selectedStartup.founder.full_name}</p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">About</h3>
                <p className="text-gray-700">{selectedStartup.description}</p>
              </div>

              {selectedStartup.value_proposition && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Value Proposition</h3>
                  <p className="text-gray-700">{selectedStartup.value_proposition}</p>
                </div>
              )}

              {selectedStartup.target_market && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Target Market</h3>
                  <p className="text-gray-700">{selectedStartup.target_market}</p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5 text-teal-600" />
                    <span className="font-semibold text-gray-900">Location</span>
                  </div>
                  <p className="text-gray-700">{selectedStartup.location || 'Not specified'}</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-teal-600" />
                    <span className="font-semibold text-gray-900">Team Size</span>
                  </div>
                  <p className="text-gray-700">{selectedStartup.team_size} members</p>
                </div>

                {selectedStartup.founded_year && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-teal-600" />
                      <span className="font-semibold text-gray-900">Founded</span>
                    </div>
                    <p className="text-gray-700">{selectedStartup.founded_year}</p>
                  </div>
                )}

                {selectedStartup.funding_stage && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-5 h-5 text-teal-600" />
                      <span className="font-semibold text-gray-900">Funding</span>
                    </div>
                    <p className="text-gray-700">
                      {getFundingLabel(selectedStartup.funding_stage)}
                      {selectedStartup.funding_raised && selectedStartup.funding_raised > 0 && (
                        <span className="block text-sm text-gray-600 mt-1">
                          ${selectedStartup.funding_raised.toLocaleString()} raised
                        </span>
                      )}
                    </p>
                  </div>
                )}
              </div>

              {selectedStartup.mentorship_areas && selectedStartup.mentorship_areas.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Looking for Help With</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedStartup.mentorship_areas.map((area) => (
                      <span key={area} className="px-3 py-1 bg-teal-100 text-teal-700 text-sm rounded-full">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedStartup.website_url && (
                <a
                  href={selectedStartup.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors"
                >
                  Visit Website
                  <ExternalLink className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
