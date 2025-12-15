import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function WhoWeAre() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
              Who We Are
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Nailab is a startup incubator and accelerator, founded in 2010, dedicated to supporting early-stage and growth-stage startups with the skills, mentorship, networks, and funding they need to turn bold ideas into scalable, tech-enabled businesses solving real challenges in sectors like healthcare, agriculture, fintech, education, and more.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Through tailored acceleration programs, hands-on guidance, and investor connections, we've helped shape Africa's startup ecosystem—driving innovation, creating jobs, and advancing inclusive economic growth across the continent.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center space-x-2 text-purple-600 font-semibold text-lg hover:text-purple-700 transition-colors group"
            >
              <span>More About Us</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Nailab team and community"
                className="w-full h-[450px] object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-purple-100 rounded-2xl -z-10"></div>
            <div className="absolute -top-4 -left-4 w-40 h-40 bg-teal-100 rounded-2xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
