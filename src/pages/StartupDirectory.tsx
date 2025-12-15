import { useState, useEffect } from 'react';
import { Search, MapPin, Users } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';

interface Startup {
  id: string;
  startup_name: string;
  logo_url: string | null;
  description: string | null;
  sector: string | null;
  stage: string | null;
  location: string | null;
  team_size: number;
}

export default function StartupDirectory() {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchStartups() {
      try {
        const { data, error } = await supabase
          .from('startup_profiles')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setStartups(data || []);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStartups();
  }, []);

  const filteredStartups = startups.filter(startup =>
    startup.startup_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    startup.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <section className="py-20 bg-gradient-to-br from-teal-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 text-center">
            Startup Directory
          </h1>
          <p className="text-xl text-gray-700 text-center max-w-3xl mx-auto mb-8">
            Discover innovative startups from across Africa
          </p>

          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search startups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 shadow-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStartups.map((startup) => (
                <div key={startup.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={startup.logo_url || 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?w=100'}
                      alt={startup.startup_name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900">{startup.startup_name}</h3>
                      {startup.stage && (
                        <span className="inline-block px-2 py-1 bg-teal-100 text-teal-700 text-xs font-medium rounded mt-1 capitalize">
                          {startup.stage}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm mb-4 line-clamp-3">{startup.description}</p>

                  <div className="space-y-2 text-sm text-gray-600">
                    {startup.sector && <div><span className="font-medium">Sector:</span> {startup.sector}</div>}
                    {startup.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{startup.location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{startup.team_size} team members</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && filteredStartups.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No startups found</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
