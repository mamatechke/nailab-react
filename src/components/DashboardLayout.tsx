import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Home,
  Building2,
  TrendingUp,
  Users,
  BookOpen,
  MessageSquare,
  Briefcase,
  Network,
  Settings,
  HelpCircle,
  LogOut,
  Calendar,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: 'founder' | 'mentor';
}

export default function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { profile } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const founderNavItems = [
    { label: 'Home', icon: Home, path: '/dashboard' },
    { label: 'Startup Profile', icon: Building2, path: '/dashboard/profile' },
    { label: 'Progress Tracker', icon: TrendingUp, path: '/dashboard/progress' },
    { label: 'Mentorship', icon: Users, path: '/dashboard/mentorship' },
    { label: 'Resource Library', icon: BookOpen, path: '/resources' },
    { label: 'Messages', icon: MessageSquare, path: '/dashboard/messages' },
    { label: 'Opportunities', icon: Briefcase, path: '/dashboard/opportunities' },
    { label: 'Community', icon: Network, path: '/dashboard/community' },
    { label: 'Account Settings', icon: Settings, path: '/dashboard/settings' },
    { label: 'Support', icon: HelpCircle, path: '/dashboard/support' },
  ];

  const mentorNavItems = [
    { label: 'Overview', icon: Home, path: '/dashboard' },
    { label: 'Messages', icon: MessageSquare, path: '/dashboard/messages' },
    { label: 'My Schedule', icon: Calendar, path: '/dashboard/schedule' },
    { label: 'My Startups', icon: Building2, path: '/dashboard/startups' },
    { label: 'Profile', icon: Users, path: '/dashboard/profile' },
    { label: 'Settings', icon: Settings, path: '/dashboard/settings' },
    { label: 'Support', icon: HelpCircle, path: '/dashboard/support' },
  ];

  const navItems = role === 'founder' ? founderNavItems : mentorNavItems;

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed lg:static lg:translate-x-0 inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out flex flex-col`}
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {role === 'founder' ? 'Startup Hub' : 'Mentor Portal'}
              </h2>
              <p className="text-sm text-gray-600 mt-1">{profile?.full_name}</p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      active
                        ? 'bg-teal-50 text-teal-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 lg:hidden sticky top-0 z-30">
          <div className="px-4 py-4 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">
              {role === 'founder' ? 'Startup Hub' : 'Mentor Portal'}
            </h1>
            <div className="w-10" />
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
