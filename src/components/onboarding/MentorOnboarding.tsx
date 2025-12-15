import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface MentorOnboardingProps {
  userId: string;
  onComplete: () => void;
}

interface MentorFormData {
  fullName: string;
  bio: string;
  title: string;
  organization: string;
  yearsExperience: string;
  advisoryExperience: string;
  industries: string[];
  mentorshipAreas: string[];
  startupStages: string;
  mentorshipApproach: string;
  motivation: string;
  availabilityHours: string;
  preferredMode: string;
  ratePerHour: string;
  linkedinUrl: string;
}

const INDUSTRIES = [
  'Agritech', 'Healthtech', 'Fintech', 'Edutech', 'Mobility & Logisticstech',
  'E-commerce & Retailtech', 'SaaS', 'Creative & Mediatech', 'Cleantech',
  'AI & ML', 'Robotics', 'Mobiletech', 'Other'
];

const MENTORSHIP_AREAS = [
  'Business model refinement',
  'Product-market fit',
  'Access to customers and markets',
  'Go-to-market planning and launch',
  'Product development',
  'Pitching, fundraising, and investor readiness',
  'Marketing and branding',
  'Team building and HR',
  'Budgeting and financial management',
  'Market expansion (local or regional)',
  'Legal or regulatory guidance',
  'Leadership and personal growth',
  'Strategic partnerships and collaborations',
  'Sales and customer acquisition'
];

export default function MentorOnboarding({ userId, onComplete }: MentorOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm<MentorFormData>({
    defaultValues: {
      industries: [],
      mentorshipAreas: []
    }
  });

  const totalSteps = 4;
  const selectedIndustries = watch('industries') || [];
  const selectedAreas = watch('mentorshipAreas') || [];

  const toggleIndustry = (industry: string) => {
    const current = selectedIndustries;
    if (current.includes(industry)) {
      setValue('industries', current.filter(i => i !== industry));
    } else {
      setValue('industries', [...current, industry]);
    }
  };

  const toggleMentorshipArea = (area: string) => {
    const current = selectedAreas;
    if (current.includes(area)) {
      setValue('mentorshipAreas', current.filter(a => a !== area));
    } else {
      setValue('mentorshipAreas', [...current, area]);
    }
  };

  const onSubmit = async (data: MentorFormData) => {
    setLoading(true);
    try {
      await supabase.from('user_profiles').update({
        full_name: data.fullName,
        bio: data.bio,
        title: data.title,
        organization: data.organization,
        years_experience: parseInt(data.yearsExperience) || 0,
        advisory_experience: data.advisoryExperience === 'yes',
        sectors: data.industries,
        expertise: data.mentorshipAreas,
        stage_preference: [data.startupStages],
        mentorship_approach: data.mentorshipApproach,
        motivation: data.motivation,
        availability_hours_month: parseInt(data.availabilityHours) || 0,
        preferred_mentorship_mode: data.preferredMode,
        rate_per_hour: parseFloat(data.ratePerHour) || 0,
        pro_bono: parseFloat(data.ratePerHour) === 0,
        linkedin_url: data.linkedinUrl,
        role: 'mentor',
        profile_visibility: true,
        onboarding_completed: true,
      }).eq('id', userId);

      onComplete();
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Nailab's Mentor Network!</h2>
              <p className="text-gray-600">Thank you for your interest in empowering African entrepreneurs. Let's get your profile set up.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register('fullName', { required: 'Full name is required' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="John Doe"
              />
              {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Short Professional Bio <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register('bio', { required: 'Bio is required' })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="A 2-3 sentence summary of your background, relevant experience, and what you are passionate about..."
              />
              {errors.bio && <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Role or Job Title <span className="text-red-500">*</span>
              </label>
              <input
                {...register('title', { required: 'Title is required' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="e.g., Founder & CEO, Investment Analyst, Marketing Consultant"
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Organization <span className="text-red-500">*</span>
              </label>
              <input
                {...register('organization', { required: 'Organization is required' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="Your current place of work or 'Independent Consultant' if self-employed"
              />
              {errors.organization && <p className="mt-1 text-sm text-red-600">{errors.organization.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Years of Professional Experience <span className="text-red-500">*</span>
              </label>
              <select
                {...register('yearsExperience', { required: 'Experience is required' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Select experience</option>
                <option value="3">Less than 3 years</option>
                <option value="4">3-5 years</option>
                <option value="8">6-10 years</option>
                <option value="15">10+ years</option>
              </select>
              {errors.yearsExperience && <p className="mt-1 text-sm text-red-600">{errors.yearsExperience.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Advisory or Investor Experience <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-600 mb-3">Have you previously supported startups as an advisor, board member, or investor?</p>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    {...register('advisoryExperience', { required: 'Please select an option' })}
                    type="radio"
                    value="yes"
                    className="mr-2 text-teal-600"
                  />
                  <span>Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    {...register('advisoryExperience', { required: 'Please select an option' })}
                    type="radio"
                    value="no"
                    className="mr-2 text-teal-600"
                  />
                  <span>No</span>
                </label>
              </div>
              {errors.advisoryExperience && <p className="mt-1 text-sm text-red-600">{errors.advisoryExperience.message}</p>}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Areas of Expertise</h2>
              <p className="text-gray-600">Select industries and areas where you can provide mentorship</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Industries You Can Mentor In <span className="text-red-500">*</span>
              </label>
              <div className="grid md:grid-cols-2 gap-3 max-h-96 overflow-y-auto p-1">
                {INDUSTRIES.map((industry) => (
                  <label
                    key={industry}
                    className={`flex items-start p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedIndustries.includes(industry)
                        ? 'border-teal-500 bg-teal-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedIndustries.includes(industry)}
                      onChange={() => toggleIndustry(industry)}
                      className="mt-1 mr-3 text-teal-600"
                    />
                    <span className="text-sm">{industry}</span>
                  </label>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2">{selectedIndustries.length} selected</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Mentorship Areas <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-600 mb-3">What specific startup challenges are you most equipped to help founders overcome?</p>
              <div className="grid md:grid-cols-2 gap-3 max-h-96 overflow-y-auto p-1">
                {MENTORSHIP_AREAS.map((area) => (
                  <label
                    key={area}
                    className={`flex items-start p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedAreas.includes(area)
                        ? 'border-teal-500 bg-teal-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedAreas.includes(area)}
                      onChange={() => toggleMentorshipArea(area)}
                      className="mt-1 mr-3 text-teal-600"
                    />
                    <span className="text-sm">{area}</span>
                  </label>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2">{selectedAreas.length} selected</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Startup Stages <span className="text-red-500">*</span>
              </label>
              <select
                {...register('startupStages', { required: 'Please select a stage' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Select stage</option>
                <option value="idea">Idea Stage (Still validating the concept)</option>
                <option value="mvp">Early Stage (MVP/prototype built)</option>
                <option value="growth">Growth Stage (Generating revenue)</option>
                <option value="scale">Scaling Stage (Expanding to new markets)</option>
              </select>
              {errors.startupStages && <p className="mt-1 text-sm text-red-600">{errors.startupStages.message}</p>}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Mentorship Approach</h2>
              <p className="text-gray-600">Tell us about your philosophy and motivations</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Mentorship Approach <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register('mentorshipApproach', { required: 'Please describe your approach' })}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="Describe your philosophy, how you support and guide mentees, and the strategies you use to help them achieve their goals..."
              />
              {errors.mentorshipApproach && <p className="mt-1 text-sm text-red-600">{errors.mentorshipApproach.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Why Do You Want to Be a Mentor with Nailab? <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register('motivation', { required: 'Please share your motivation' })}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="Share your motivation for joining our mentor network..."
              />
              {errors.motivation && <p className="mt-1 text-sm text-red-600">{errors.motivation.message}</p>}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Availability & Details</h2>
              <p className="text-gray-600">Final details to complete your profile</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Monthly Availability <span className="text-red-500">*</span>
              </label>
              <select
                {...register('availabilityHours', { required: 'Please select your availability' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Select availability</option>
                <option value="2">Up to 2 hours per week</option>
                <option value="4">3-5 hours per month</option>
                <option value="8">6-10 hours per month</option>
                <option value="12">10+ hours per month</option>
                <option value="0">Flexible, depending on need</option>
              </select>
              {errors.availabilityHours && <p className="mt-1 text-sm text-red-600">{errors.availabilityHours.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Mentorship Mode <span className="text-red-500">*</span>
              </label>
              <select
                {...register('preferredMode', { required: 'Please select a mode' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Select mode</option>
                <option value="virtual">Virtual Sessions</option>
                <option value="in_person">In-person Sessions (where available)</option>
                <option value="both">Both</option>
              </select>
              {errors.preferredMode && <p className="mt-1 text-sm text-red-600">{errors.preferredMode.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hourly Session Charge (USD) <span className="text-red-500">*</span>
              </label>
              <input
                {...register('ratePerHour', { required: 'Please enter your rate (enter 0 for pro bono)' })}
                type="number"
                step="0.01"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="Enter 0 for pro bono sessions"
              />
              <p className="text-sm text-gray-600 mt-1">This rate will be displayed on your profile. You can offer pro bono sessions or adjust rates.</p>
              {errors.ratePerHour && <p className="mt-1 text-sm text-red-600">{errors.ratePerHour.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                LinkedIn Profile or Professional Website <span className="text-red-500">*</span>
              </label>
              <input
                {...register('linkedinUrl', { required: 'LinkedIn URL is required' })}
                type="url"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="https://linkedin.com/in/yourprofile"
              />
              {errors.linkedinUrl && <p className="mt-1 text-sm text-red-600">{errors.linkedinUrl.message}</p>}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Mentor Onboarding</h1>
              <p className="text-gray-600 mt-1">Step {currentStep} of {totalSteps}</p>
            </div>
            <img src="/logo-blue.original.png" alt="Nailab" className="h-12" />
          </div>

          <div className="flex gap-2">
            {Array.from({ length: totalSteps }).map((_, idx) => (
              <div
                key={idx}
                className={`h-2 flex-1 rounded-full transition-all ${
                  idx < currentStep ? 'bg-teal-600' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
            {renderStep()}
          </div>

          <div className="flex justify-between gap-4">
            <button
              type="button"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep + 1)}
                className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-all"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading || selectedIndustries.length === 0 || selectedAreas.length === 0}
                className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? 'Completing...' : (
                  <>
                    Complete Profile
                    <Check className="w-5 h-5" />
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
