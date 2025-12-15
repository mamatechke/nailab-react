import { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';

interface Mentor {
  id: string;
  full_name: string;
  photo_url: string | null;
  bio: string | null;
  title: string | null;
  location: string | null;
  sectors: string[];
  expertise: string[];
  years_experience: number;
}

export default function BrowseMentors() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchMentors() {
      try {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('role', 'mentor')
          .eq('profile_visibility', true)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setMentors(data || []);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchMentors();
  }, []);

  const filteredMentors = mentors.filter(mentor =>
    mentor.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mentor.bio?.toLowerCase().includes(searchTerm.toLowerCase())
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

          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, sector, or expertise..."
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
              {filteredMentors.map((mentor) => (
                <div key={mentor.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={mentor.photo_url || 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=100'}
                      alt={mentor.full_name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900">{mentor.full_name}</h3>
                      <p className="text-sm text-gray-600">{mentor.title}</p>
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm mb-4 line-clamp-3">{mentor.bio}</p>

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
                  </div>

                  {mentor.sectors.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {mentor.sectors.slice(0, 3).map((sector) => (
                        <span key={sector} className="px-3 py-1 bg-teal-100 text-teal-700 text-xs font-medium rounded-full">
                          {sector}
                        </span>
                      ))}
                    </div>
                  )}

                  <button className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors">
                    View Profile
                  </button>
                </div>
              ))}
            </div>
          )}

          {!loading && filteredMentors.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No mentors found</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
