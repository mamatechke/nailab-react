import { useState, useEffect } from 'react';
import { Quote, Star } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  image_url: string;
  rating: number;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setTestimonials(data || []);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Testimonials
          </h2>
          <p className="text-xl text-gray-600">
            Hear from founders who have grown with Nailab
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={testimonial.image_url}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover ring-4 ring-white shadow-md"
                  />
                  <div className="flex-1">
                    <div className="font-bold text-gray-900 text-lg">
                      {testimonial.name}
                    </div>
                    <div className="text-gray-600 text-sm mb-2">
                      {testimonial.role} at {testimonial.company}
                    </div>
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-teal-500 text-teal-500" />
                      ))}
                    </div>
                  </div>
                </div>
                <Quote className="w-8 h-8 text-teal-600 mb-3 opacity-50" />
                <p className="text-gray-700 leading-relaxed text-base">
                  "{testimonial.content}"
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
