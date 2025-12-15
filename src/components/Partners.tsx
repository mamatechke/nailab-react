import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Partner {
  id: string;
  name: string;
  logo_url: string;
  website_url: string | null;
  display_order: number;
}

export default function Partners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPartners() {
      try {
        const { data, error } = await supabase
          .from('partners')
          .select('*')
          .order('display_order', { ascending: true });

        if (error) throw error;
        setPartners(data || []);
      } catch (error) {
        console.error('Error fetching partners:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPartners();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Impact Network
          </h2>
          <p className="text-xl text-gray-600">
            Trusted by leading organizations across Africa and beyond
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {partners.map((partner) => (
              <a
                key={partner.id}
                href={partner.website_url || '#'}
                target={partner.website_url ? '_blank' : undefined}
                rel={partner.website_url ? 'noopener noreferrer' : undefined}
                className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 flex items-center justify-center group"
              >
                <img
                  src={partner.logo_url}
                  alt={partner.name}
                  className="max-w-full h-auto max-h-16 object-contain grayscale group-hover:grayscale-0 transition-all"
                />
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
