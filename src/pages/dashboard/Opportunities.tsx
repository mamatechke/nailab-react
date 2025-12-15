import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../contexts/AuthContext';

export default function Opportunities() {
  const { profile } = useAuth();

  if (!profile?.role) {
    return null;
  }

  return (
    <DashboardLayout role={profile.role as 'founder' | 'mentor'}>
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Opportunities</h1>
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <p className="text-gray-600">Funding, partnership, and growth opportunities coming soon...</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
