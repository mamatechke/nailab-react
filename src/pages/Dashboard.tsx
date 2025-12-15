import { Link } from 'react-router-dom';
import { Users, MessageSquare, TrendingUp, Calendar } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import MentorshipRequests from '../components/MentorshipRequests';
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {profile?.full_name}!
            </h1>
            <p className="text-gray-600 mt-2">Here's what's happening with your journey</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { label: 'Active Connections', value: 0, icon: Users, color: 'teal' },
              { label: 'Messages', value: 0, icon: MessageSquare, color: 'blue' },
              { label: 'Upcoming Sessions', value: 0, icon: Calendar, color: 'green' },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.label} className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{card.label}</p>
                      <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                    </div>
                    <div className="p-3 bg-gray-100 rounded-lg">
                      <Icon className="w-8 h-8 text-teal-600" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {user && profile?.role && (
            <div className="mb-8">
              <MentorshipRequests userId={user.id} role={profile.role as 'founder' | 'mentor'} />
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {profile?.role === 'founder' && (
              <>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Find Mentors</h2>
                  <p className="text-gray-600 mb-4">Connect with experienced entrepreneurs</p>
                  <Link
                    to="/browse-mentors"
                    className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    Browse Mentors
                  </Link>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Track Progress</h2>
                    <TrendingUp className="w-6 h-6 text-teal-600" />
                  </div>
                  <p className="text-gray-600 mb-4">Monitor your startup metrics</p>
                  <button className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                    View Metrics
                  </button>
                </div>
              </>
            )}

            {profile?.role === 'mentor' && (
              <>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">My Mentees</h2>
                  <p className="text-gray-600 mb-4">Track the founders you're mentoring</p>
                  <button className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                    View Mentees
                  </button>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Update Availability</h2>
                  <p className="text-gray-600 mb-4">Keep your profile up to date</p>
                  <button className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                    Edit Profile
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="bg-gradient-to-br from-teal-600 to-blue-600 rounded-xl p-8 text-white shadow-lg">
            <h2 className="text-2xl font-bold mb-2">Explore Resources</h2>
            <p className="mb-6 opacity-90">Access templates, guides, and opportunities</p>
            <Link
              to="/resources"
              className="inline-flex items-center px-6 py-3 bg-white text-teal-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Browse Resources
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
