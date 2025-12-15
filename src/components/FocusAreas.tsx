import { Heart, Sprout, DollarSign, GraduationCap, Leaf, ShoppingCart, Cloud, Brain, Bot, Smartphone, Truck, Film } from 'lucide-react';

export default function FocusAreas() {
  const focusAreas = [
    {
      icon: Heart,
      title: 'HealthTech',
      description: 'Innovative solutions improving healthcare accessibility and quality across Africa.',
    },
    {
      icon: Sprout,
      title: 'AgriTech',
      description: 'Technologies enhancing agricultural productivity and sustainability.',
    },
    {
      icon: DollarSign,
      title: 'FinTech',
      description: 'Innovations making banking, payments, and financial services more accessible.',
    },
    {
      icon: GraduationCap,
      title: 'EduTech',
      description: 'Digital solutions revolutionizing education and skill development in Africa.',
    },
    {
      icon: Leaf,
      title: 'CleanTech',
      description: 'Sustainable solutions for renewable energy and environmental conservation.',
    },
    {
      icon: ShoppingCart,
      title: 'E-commerce & RetailTech',
      description: 'Innovative solutions transforming how Africans shop and access goods, no matter where they live.',
    },
    {
      icon: Cloud,
      title: 'SaaS',
      description: 'Empowering businesses with scalable software solutions to enhance operations and growth.',
    },
    {
      icon: Brain,
      title: 'AI & ML',
      description: 'Artificial intelligence and machine learning applications solving African challenges.',
    },
    {
      icon: Bot,
      title: 'Robotics',
      description: 'Robotic innovations addressing industrial and social needs across the continent.',
    },
    {
      icon: Smartphone,
      title: 'MobileTech',
      description: 'Mobile-first solutions designed for Africa\'s rapidly growing smartphone market.',
    },
    {
      icon: Truck,
      title: 'Mobility & LogisticsTech',
      description: 'Streamlining the movement of people and goods for a more connected Africa.',
    },
    {
      icon: Film,
      title: 'Creative & MediaTech',
      description: 'Revolutionizing digital content creation and consumption across the continent.',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Focus Areas
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {focusAreas.map((area, index) => {
            const Icon = area.icon;
            return (
              <div
                key={index}
                className="group p-6 rounded-xl border-2 border-gray-200 hover:border-purple-600 transition-all hover:shadow-lg"
              >
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors">
                  <Icon className="w-6 h-6 text-teal-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {area.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {area.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
