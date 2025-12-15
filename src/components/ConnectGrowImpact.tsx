import { Rocket, Users, Handshake } from 'lucide-react';

export default function ConnectGrowImpact() {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Connect. Grow. Impact
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-6">
              <Rocket className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              For Founders
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Nailab is the launchpad for your bold ideas. Gain access to experienced business leaders and mentors, collaborate with like-minded founders building innovative startups, and access the tools, templates, and opportunities you need to launch, grow, and scale your startup in Africa. From refining your business model to securing funding, we support you every step of the way.
            </p>
            <a
              href="/founders"
              className="inline-flex items-center justify-center w-full px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
            >
              Start your journey with us
            </a>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
            <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              For Mentors
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Your experience can shape Africa's next generation of innovators. Join Nailab's mentor network to guide promising founders, share your expertise, and provide real-world insights that help startups overcome challenges and scale successfully. Be part of a movement driving innovation, impact, and entrepreneurship across the continent.
            </p>
            <a
              href="/become-mentor"
              className="inline-flex items-center justify-center w-full px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors"
            >
              Become a Mentor
            </a>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-6">
              <Handshake className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              For Partners
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Collaborate with Nailab to catalyze innovation and impact. We work with organizations that believe in entrepreneurship as a driver for inclusive change. Partner with us to co-create programs, support promising startups, and drive systemic change across Africa's innovation landscape.
            </p>
            <a
              href="/partners"
              className="inline-flex items-center justify-center w-full px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
            >
              Partner with us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
