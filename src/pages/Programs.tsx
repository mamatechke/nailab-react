import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';

interface Program {
  id: string;
  title: string;
  slug: string;
  description: string;
  cover_image_url: string;
  category: string;
}

export default function Programs() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'incubation', 'training', 'initiative', 'partnership'];

  useEffect(() => {
    async function fetchPrograms() {
      try {
        const { data, error } = await supabase
          .from('programs')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setPrograms(data || []);
      } catch (error) {
        console.error('Error fetching programs:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPrograms();
  }, []);

  const filteredPrograms = selectedCategory === 'All'
    ? programs
    : programs.filter(program => program.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <section className="py-20 bg-gradient-to-br from-purple-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 text-center">
            Our Programs
          </h1>
          <p className="text-xl text-gray-700 text-center max-w-4xl mx-auto">
            Our work spans five key pillars, each designed to support African entrepreneurs at different stages of their journey, from idea to scale.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all capitalize ${
                  selectedCategory === category
                    ? 'bg-teal-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPrograms.map((program) => (
                  <div
                    key={program.id}
                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={program.cover_image_url}
                        alt={program.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="inline-block px-4 py-1 bg-teal-600 text-white text-sm font-semibold rounded-full shadow-lg">
                          {program.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {program.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-6">
                        {program.description}
                      </p>
                      <Link
                        to={`/programs/${program.slug}`}
                        className="inline-flex items-center space-x-2 text-teal-600 font-semibold hover:text-teal-700 transition-colors group"
                      >
                        <span>Learn more</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {filteredPrograms.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-xl text-gray-600">
                    No programs found in this category.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
