import { UserCircle, MessageSquare, Users, BookOpen } from 'lucide-react';

export default function HowWeSupport() {
  const supportItems = [
    {
      icon: UserCircle,
      title: 'Create your founder profile',
      description: 'Start by setting up your profile to access built-in tools that help you track your startup\'s monthly progress and growth milestones.',
    },
    {
      icon: MessageSquare,
      title: 'Find mentors',
      description: 'Book 1-on-1 mentorship sessions and get personalized guidance from seasoned business leaders who\'ve built and scaled successful startups across Africa and beyond.',
    },
    {
      icon: Users,
      title: 'Peer-to-peer network',
      description: 'Connect directly with fellow founders who understand your challenges. Share insights, exchange strategies, and build supportive relationships with peers on the same journey.',
    },
    {
      icon: BookOpen,
      title: 'Access growth resources',
      description: 'Get curated templates, playbooks, funding leads, and exclusive invites to events, pitch days, and accelerator opportunities.',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            How Nailab Supports You
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {supportItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-teal-100 rounded-lg flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-teal-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
