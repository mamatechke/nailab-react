import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function Pricing() {
  const tiers = [
    {
      name: 'Free',
      price: '0',
      features: ['Browse mentor profiles', 'Access public resources', 'Join community forum', 'Attend public events'],
      cta: 'Get Started',
      highlighted: false,
    },
    {
      name: 'Basic',
      price: '49',
      features: ['Everything in Free', 'Connect with 2 mentors', 'Premium resources', 'Group sessions', 'Priority events'],
      cta: 'Start Growing',
      highlighted: true,
    },
    {
      name: 'Premium',
      price: '99',
      features: ['Everything in Basic', 'Unlimited mentors', 'Startup profile', '1-on-1 sessions', 'Investor intros', 'API access'],
      cta: 'Scale Up',
      highlighted: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <section className="py-20 bg-gradient-to-br from-teal-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Join thousands of entrepreneurs accelerating their startup journey
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden ${
                  tier.highlighted ? 'ring-4 ring-teal-600 transform scale-105' : ''
                }`}
              >
                {tier.highlighted && (
                  <div className="bg-teal-600 text-white text-center py-2 font-semibold text-sm">Most Popular</div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-gray-900">${tier.price}</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  <Link
                    to="/signup"
                    className={`block w-full text-center px-6 py-3 rounded-lg font-semibold transition-colors ${
                      tier.highlighted ? 'bg-teal-600 text-white hover:bg-teal-700' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {tier.cta}
                  </Link>
                </div>
                <div className="px-8 pb-8">
                  <ul className="space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
