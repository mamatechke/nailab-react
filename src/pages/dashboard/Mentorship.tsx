import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function Mentorship() {
  const { profile } = useAuth();

  if (!profile?.role) {
    return null;
  }

  return (
    <DashboardLayout role={profile.role as 'founder' | 'mentor'}>
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Mentorship</h1>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Find Mentors</h2>
              <p className="text-gray-600 mb-4">Connect with experienced entrepreneurs</p>
              <Link
                to="/mentors"
                className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                Browse Mentors
              </Link>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 mb-4">My Connections</h2>
              <p className="text-gray-600">Your mentorship connections will appear here...</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
