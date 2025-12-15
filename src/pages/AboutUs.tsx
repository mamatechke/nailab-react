import { Target, Eye, Heart, Users, Shield, Leaf, Lightbulb, Handshake } from 'lucide-react';
import Navigation from '../components/Navigation';
import BottomCTA from '../components/BottomCTA';
import Footer from '../components/Footer';

export default function AboutUs() {
  const impactStats = [
    { value: '10+', label: 'Years of Impact' },
    { value: '54', label: 'Africa Countries' },
    { value: '30+', label: 'Innovation Programs' },
    { value: '$100M', label: 'Funding Facilitated' },
    { value: '1000', label: 'Startups Supported' },
    { value: '50+', label: 'Partners' },
  ];

  const values = [
    {
      icon: Users,
      title: 'Entrepreneur-First',
      description: 'We prioritize the needs and growth of African entrepreneurs by offering support that is tailored, relevant, and results-driven.',
    },
    {
      icon: Lightbulb,
      title: 'Innovation for Impact',
      description: 'We champion bold thinking and creative solutions that address real-world challenges and deliver lasting, meaningful change across communities and sectors.',
    },
    {
      icon: Heart,
      title: 'Inclusion',
      description: 'We strive to ensure that opportunities are accessible to all, ensuring that innovators of all backgrounds, especially youth and women, have equal access to resources and support they need.',
    },
    {
      icon: Handshake,
      title: 'Collaboration & Community',
      description: 'We are building a collaborative community of founders, mentors, investors, and partners to create strong innovation ecosystems that support African entrepreneurs.',
    },
    {
      icon: Shield,
      title: 'Integrity',
      description: 'We operate with transparency, honesty, and respect in all our engagements, earning the trust of our entrepreneurs and partners.',
    },
    {
      icon: Leaf,
      title: 'Sustainability',
      description: 'We support ventures and partnerships that prioritize long-term impact—for people, the economy, and the planet.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <section className="py-20 bg-gradient-to-br from-purple-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Empowering Africa's boldest innovators to build, scale, and transform industries.
          </h1>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
                Why Nailab Exists
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Limited access to capital and knowledge are among the biggest challenges African founders face when launching their startups. In Africa, Nailab is changing that narrative by lowering the barriers to entry for tech founders looking to start and scale their businesses.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                For over a decade, we have supported founders with the skills, mentorship, and funding they need to build scalable, impact-driven businesses that tackle Africa's most pressing challenges. Through strategic partnerships and tailored coaching programs, we create an enabling environment where startups can succeed — connecting them with investors, mentors, and key networks.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                At Nailab, we believe in the power of African-led solutions to transform industries and uplift communities.
              </p>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Nailab team collaboration"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-purple-100 rounded-2xl -z-10"></div>
              <div className="absolute -top-4 -left-4 w-40 h-40 bg-teal-100 rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-purple-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Our Impact
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-purple-100">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-purple-50 to-teal-50 rounded-2xl p-12">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Our Mission
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                To be Africa's leading launchpad, empowering bold innovators with the knowledge, mentorship, and community to turn their ideas into scalable, tech-driven solutions that drive economic growth and address the continent's most pressing challenges.
              </p>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-purple-50 rounded-2xl p-12">
              <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Our Vision
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                To build an inclusive network that supports African founders through a collaborative platform where mentors, investors, and founders work together to scale innovative, tech-driven startups.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              What Drives Us
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  <div className="w-14 h-14 bg-teal-100 rounded-lg flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-teal-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <BottomCTA />
      <Footer />
    </div>
  );
}
