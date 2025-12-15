import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { supabase } from '../lib/supabase';
import ReactMarkdown from 'react-markdown';

interface Program {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  cover_image_url: string;
  category: string;
  created_at: string;
}

export default function ProgramDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProgram() {
      try {
        const { data, error } = await supabase
          .from('programs')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();

        if (error) throw error;

        if (!data) {
          setError('Program not found');
        } else {
          setProgram(data);
        }
      } catch (error) {
        console.error('Error fetching program:', error);
        setError('Failed to load program');
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchProgram();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (error || !program) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {error || 'Program not found'}
          </h1>
          <Link
            to="/programs"
            className="text-teal-600 hover:text-teal-700 font-semibold"
          >
            Back to Programs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-96 bg-gray-900">
        <img
          src={program.cover_image_url}
          alt={program.title}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <Link
              to="/programs"
              className="inline-flex items-center gap-2 text-white hover:text-gray-200 mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Programs
            </Link>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              {program.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-gray-200">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(program.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                <span className="capitalize">{program.category}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {program.description}
          </p>

          <div className="prose prose-lg max-w-none">
            <div className="markdown-content space-y-6 text-gray-700 leading-relaxed">
              {program.content.split('\n').map((line, index) => {
                if (line.startsWith('# ')) {
                  return (
                    <h1 key={index} className="text-3xl font-bold text-gray-900 mt-8 mb-4">
                      {line.substring(2)}
                    </h1>
                  );
                } else if (line.startsWith('## ')) {
                  return (
                    <h2 key={index} className="text-2xl font-bold text-gray-900 mt-6 mb-3">
                      {line.substring(3)}
                    </h2>
                  );
                } else if (line.startsWith('### ')) {
                  return (
                    <h3 key={index} className="text-xl font-bold text-gray-900 mt-4 mb-2">
                      {line.substring(4)}
                    </h3>
                  );
                } else if (line.startsWith('- ')) {
                  return (
                    <li key={index} className="ml-6 list-disc">
                      {line.substring(2)}
                    </li>
                  );
                } else if (line.trim() === '') {
                  return <div key={index} className="h-2"></div>;
                } else {
                  return (
                    <p key={index} className="text-base leading-relaxed">
                      {line}
                    </p>
                  );
                }
              })}
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-teal-600 text-white text-lg font-semibold rounded-lg hover:bg-teal-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Apply Now
              </Link>
              <Link
                to="/programs"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-teal-600 text-lg font-semibold rounded-lg hover:bg-gray-50 transition-all border-2 border-teal-600"
              >
                View All Programs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
