import { useState } from 'react';
import { Mail, Phone, ChevronDown } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: 'What kind of startups does Nailab support?',
      answer: 'Nailab supports early-stage and growth-stage startups leveraging innovation to tackle Africa\'s most pressing social challenges across key sectors including fintech, agritech, healthtech, edtech, SaaS, cleantech, creative & mediatech, e-commerce & retailtech, mobility & logisticstech, and social impact. We partner with passionate founders with a clear vision and deep understanding of the challenges they are addressing.',
    },
    {
      question: 'How do I apply for Nailab\'s programs?',
      answer: 'Interested in joining a Nailab program? We regularly announce application windows on our official website and social media platforms. You can find detailed information and application links for all our current opportunities on our "Programs" page, which you\'ll find under the "Resources" section.',
    },
    {
      question: 'What does a typical incubation and/or accelerator program involve?',
      answer: 'Our programs typically run for 3–6 months, depending on the specific focus and structure. They are designed to equip entrepreneurs with the tools, knowledge, and networks they need to build and scale sustainable businesses.\n\nKey components include:\n• Mentorship: Access to experienced mentors who provide guidance on strategy, operations, product development, and leadership.\n• Business development training: Practical workshops on business modeling, customer discovery, marketing, finance, legal compliance, and team building.\n• Pitch coaching: Personalized support to help you craft compelling investor pitches.\n• Access to investors and networks: Opportunities to connect with potential investors, partners, and ecosystem enablers.\n• Seed funding (where applicable): Selected startups may receive initial capital.',
    },
    {
      question: 'What stage should my startup be at to apply for Nailab Programs?',
      answer: 'While some of our programs are tailored for early-stage entrepreneurs who are still refining their concepts, others are better suited for startups with a developed product, initial traction, or a proven business model.\n\nRegardless of stage, we look for founders who demonstrate a clear vision, deep understanding of the problem they\'re solving, and a strong commitment to creating meaningful, sustainable impact.\n\nEach program has its own eligibility criteria, so we encourage you to carefully review the details provided in the call for applications.',
    },
    {
      question: 'Does Nailab provide funding to startups?',
      answer: 'Yes. Some of our programs provide seed funding or connect startups to investors through demo days and pitch sessions.',
    },
    {
      question: 'What are the benefits of joining the Nailab startup network?',
      answer: 'Joining the Nailab network gives you access to a thriving community of like-minded African founders, expert mentors, and global industry leaders. You can connect and collaborate with founders from all over the continent through our conversation forum, book office hours with seasoned mentors and business leaders from around the world and gain real-world insights tailored to your startup challenges and access tools, templates, and curated resources to help you build and grow your business.',
    },
    {
      question: 'How can I become a Nailab mentor?',
      answer: 'We\'re always looking to grow our community of passionate, experienced mentors who want to give back and support Africa\'s next wave of entrepreneurs. If you have industry expertise, entrepreneurial experience, or a strong desire to guide startups, we\'d love to hear from you. Visit our Mentors page to apply or learn more.',
    },
    {
      question: 'How can I partner with Nailab?',
      answer: 'We collaborate with development agencies, corporates, governments, and academic institutions to co-create social impact programs, support high-potential startups, and drive systemic change across Africa\'s innovation ecosystem. If you\'re interested in partnering with us, please reach out through our Expertise page.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <section className="py-20 bg-gradient-to-br from-purple-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 text-center">
            Contact Us
          </h1>
          <p className="text-xl text-gray-700 text-center max-w-3xl mx-auto">
            Have a question or want to get in touch? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Get in Touch
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  Send Message
                </button>
              </form>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Reach Us
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                      <a href="mailto:hello@nailab.co.ke" className="text-purple-600 hover:text-purple-700 transition-colors">
                        hello@nailab.co.ke
                      </a>
                      <br />
                      <a href="mailto:ceo@nailab.co.ke" className="text-purple-600 hover:text-purple-700 transition-colors">
                        ceo@nailab.co.ke
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
                      <a href="tel:+254790492467" className="text-purple-600 hover:text-purple-700 transition-colors">
                        +254 790 492467
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-purple-600 flex-shrink-0 transition-transform ${
                      openFAQ === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-5">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
