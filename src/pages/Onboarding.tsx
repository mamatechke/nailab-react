import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import FounderOnboarding from '../components/onboarding/FounderOnboarding';
import MentorOnboarding from '../components/onboarding/MentorOnboarding';

export default function Onboarding() {
  const { user, profile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  useEffect(() => {
    if (profile?.onboarding_completed) {
      navigate('/dashboard');
    } else if (profile?.role && profile.role !== 'investor') {
      setSelectedRole(profile.role);
    }
  }, [profile, navigate]);

  if (profile?.onboarding_completed) {
    return null;
  }

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Nailab!</h1>
            <p className="text-gray-600">Let's get you set up. Choose your role to get started.</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 space-y-4">
            <label className="block text-sm font-medium text-gray-700 mb-3">I am a...</label>
            <div className="space-y-3">
              {[
                { value: 'founder', label: 'Founder / Entrepreneur', desc: 'Looking for mentorship and growth opportunities' },
                { value: 'mentor', label: 'Mentor', desc: 'Ready to share experience and guide startups' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedRole(option.value)}
                  className="w-full flex flex-col items-start p-6 border-2 rounded-lg cursor-pointer hover:border-teal-500 hover:bg-teal-50 transition-all text-left"
                >
                  <span className="font-semibold text-lg text-gray-900">{option.label}</span>
                  <span className="text-sm text-gray-600 mt-1">{option.desc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedRole === 'founder') {
    return <FounderOnboarding userId={user?.id || ''} onComplete={() => {
      refreshProfile();
      navigate('/dashboard');
    }} />;
  }

  if (selectedRole === 'mentor') {
    return <MentorOnboarding userId={user?.id || ''} onComplete={() => {
      refreshProfile();
      navigate('/dashboard');
    }} />;
  }

  return null;
}
