import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';

interface Resource {
  id: string;
  title: string;
  category: string;
  description: string | null;
  created_at: string;
}

export default function Resources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { value: 'all', label: 'All Resources' },
    { value: 'blog', label: 'Blogs' },
    { value: 'template', label: 'Templates' },
    { value: 'opportunity', label: 'Opportunities' },
    { value: 'event', label: 'Events' },
  ];

  useEffect(() => {
    async function fetchResources() {
      try {
        let query = supabase
          .from('resources')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false });

        if (selectedCategory !== 'all') {
          query = query.eq('category', selectedCategory);
        }

        const { data, error } = await query;
        if (error) throw error;
        setResources(data || []);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchResources();
  }, [selectedCategory]);

  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <section className="py-20 bg-gradient-to-br from-teal-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 text-center">
            Resources Hub
          </h1>
          <p className="text-xl text-gray-700 text-center max-w-3xl mx-auto mb-8">
            Access templates, guides, opportunities, and events
          </p>

          <div className="max-w-2xl mx-auto space-y-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 shadow-lg focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                    selectedCategory === cat.value
                      ? 'bg-teal-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
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
              {filteredResources.map((resource) => (
                <div key={resource.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                  <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 text-xs font-medium rounded-full mb-3 capitalize">
                    {resource.category}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{resource.title}</h3>
                  <p className="text-gray-700 text-sm line-clamp-3">{resource.description}</p>
                </div>
              ))}
            </div>
          )}

          {!loading && filteredResources.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No resources found</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
