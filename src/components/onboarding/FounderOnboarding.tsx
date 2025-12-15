import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface FounderOnboardingProps {
  userId: string;
  onComplete: () => void;
}

interface FounderFormData {
  fullName: string;
  phoneNumber: string;
  location: string;
  bio: string;
  startupName: string;
  startupStage: string;
  startupDescription: string;
  targetMarket: string;
  sector: string;
  valueProposition: string;
  fundingStage: string;
  fundingRaised: string;
  mentorshipAreas: string[];
  challengeDetails: string;
  preferredMode: string;
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

export default function FounderOnboarding({ userId, onComplete }: FounderOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm<FounderFormData>({
    defaultValues: {
      mentorshipAreas: []
    }
  });

  const totalSteps = 5;
  const selectedAreas = watch('mentorshipAreas') || [];

  const toggleMentorshipArea = (area: string) => {
    const current = selectedAreas;
    if (current.includes(area)) {
      setValue('mentorshipAreas', current.filter(a => a !== area));
    } else if (current.length < 3) {
      setValue('mentorshipAreas', [...current, area]);
    }
  };

  const onSubmit = async (data: FounderFormData) => {
    setLoading(true);
    try {
      await supabase.from('user_profiles').update({
        full_name: data.fullName,
        phone_number: data.phoneNumber,
        location: data.location,
        bio: data.bio,
        role: 'founder',
        sectors: [data.sector],
        preferred_mentorship_mode: data.preferredMode,
        onboarding_completed: true,
      }).eq('id', userId);

      const { data: startupData } = await supabase
        .from('startup_profiles')
        .select('id')
        .eq('user_id', userId)
        .maybeSingle();

      if (startupData) {
        await supabase.from('startup_profiles').update({
          startup_name: data.startupName,
          description: data.startupDescription,
          sector: data.sector,
          stage: data.startupStage,
          location: data.location,
          target_market: data.targetMarket,
          value_proposition: data.valueProposition,
          funding_stage: data.fundingStage,
          funding_raised: parseFloat(data.fundingRaised) || 0,
          mentorship_areas: data.mentorshipAreas,
          challenge_details: data.challengeDetails,
          preferred_mentorship_mode: data.preferredMode,
          phone_number: data.phoneNumber,
        }).eq('id', startupData.id);
      } else {
        await supabase.from('startup_profiles').insert({
          user_id: userId,
          startup_name: data.startupName,
          description: data.startupDescription,
          sector: data.sector,
          stage: data.startupStage,
          location: data.location,
          target_market: data.targetMarket,
          value_proposition: data.valueProposition,
          funding_stage: data.fundingStage,
          funding_raised: parseFloat(data.fundingRaised) || 0,
          mentorship_areas: data.mentorshipAreas,
          challenge_details: data.challengeDetails,
          preferred_mentorship_mode: data.preferredMode,
          phone_number: data.phoneNumber,
        });
      }

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
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
              <p className="text-gray-600">Let's start with your basic details</p>
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

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('phoneNumber', { required: 'Phone number is required' })}
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  placeholder="+254 700 000 000"
                />
                {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('location', { required: 'Location is required' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  placeholder="Nairobi, Kenya"
                />
                {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tell us about yourself <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register('bio', { required: 'Bio is required' })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="Share your background, role, and what drives you as an entrepreneur..."
              />
              {errors.bio && <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Startup Information</h2>
              <p className="text-gray-600">Tell us about your venture</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Startup Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register('startupName', { required: 'Startup name is required' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="Your startup name"
              />
              {errors.startupName && <p className="mt-1 text-sm text-red-600">{errors.startupName.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Startup Stage <span className="text-red-500">*</span>
              </label>
              <select
                {...register('startupStage', { required: 'Startup stage is required' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Select stage</option>
                <option value="idea">Idea Stage (Still validating the concept)</option>
                <option value="mvp">Early Stage (MVP/prototype built)</option>
                <option value="growth">Growth Stage (Generating revenue)</option>
                <option value="scale">Scaling Stage (Expanding to new markets)</option>
              </select>
              {errors.startupStage && <p className="mt-1 text-sm text-red-600">{errors.startupStage.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Brief Description <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register('startupDescription', { required: 'Description is required', maxLength: 300 })}
                rows={4}
                maxLength={300}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="Concise overview of your business, products/services, and the problem you're solving (max 300 words)"
              />
              {errors.startupDescription && <p className="mt-1 text-sm text-red-600">{errors.startupDescription.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Industry <span className="text-red-500">*</span>
              </label>
              <select
                {...register('sector', { required: 'Industry is required' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Select industry</option>
                {INDUSTRIES.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
              {errors.sector && <p className="mt-1 text-sm text-red-600">{errors.sector.message}</p>}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Market & Value Proposition</h2>
              <p className="text-gray-600">Help us understand your market position</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target Market <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register('targetMarket', { required: 'Target market is required' })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="Who are your ideal customers? Include age, gender, location, income level, and relevant demographics..."
              />
              {errors.targetMarket && <p className="mt-1 text-sm text-red-600">{errors.targetMarket.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unique Value Proposition <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register('valueProposition', { required: 'Value proposition is required' })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="What makes your business stand out? Describe the unique value your product/service offers compared to competitors..."
              />
              {errors.valueProposition && <p className="mt-1 text-sm text-red-600">{errors.valueProposition.message}</p>}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Funding Information</h2>
              <p className="text-gray-600">Tell us about your funding status</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Funding Stage <span className="text-red-500">*</span>
              </label>
              <select
                {...register('fundingStage', { required: 'Funding stage is required' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Select funding stage</option>
                <option value="bootstrapped">Bootstrapped</option>
                <option value="friends_family">Friends & Family</option>
                <option value="angel">Angel Investment</option>
                <option value="pre_seed">Pre-seed</option>
                <option value="seed">Seed</option>
                <option value="series_a">Series A</option>
                <option value="series_b_plus">Series B or beyond</option>
                <option value="grant">Grant-funded</option>
              </select>
              {errors.fundingStage && <p className="mt-1 text-sm text-red-600">{errors.fundingStage.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Funding Raised in USD (if applicable)
              </label>
              <input
                {...register('fundingRaised')}
                type="number"
                step="0.01"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="0"
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Mentorship Needs</h2>
              <p className="text-gray-600">How can we help you grow?</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select top 3 areas where you need mentorship <span className="text-red-500">*</span>
              </label>
              <div className="grid md:grid-cols-2 gap-3">
                {MENTORSHIP_AREAS.map((area) => (
                  <label
                    key={area}
                    className={`flex items-start p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedAreas.includes(area)
                        ? 'border-teal-500 bg-teal-50'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${selectedAreas.length >= 3 && !selectedAreas.includes(area) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedAreas.includes(area)}
                      onChange={() => toggleMentorshipArea(area)}
                      disabled={selectedAreas.length >= 3 && !selectedAreas.includes(area)}
                      className="mt-1 mr-3 text-teal-600"
                    />
                    <span className="text-sm">{area}</span>
                  </label>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2">{selectedAreas.length}/3 selected</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Challenge Details <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register('challengeDetails', { required: 'Please provide details about your challenges' })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="Provide more details about the challenges or opportunities you would like guidance on..."
              />
              {errors.challengeDetails && <p className="mt-1 text-sm text-red-600">{errors.challengeDetails.message}</p>}
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
                <option value="one_on_one">One-on-one Sessions</option>
                <option value="group">Group Mentorship</option>
                <option value="virtual">Virtual Mentorship</option>
                <option value="in_person">In-person</option>
              </select>
              {errors.preferredMode && <p className="mt-1 text-sm text-red-600">{errors.preferredMode.message}</p>}
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
              <h1 className="text-2xl font-bold text-gray-900">Founder Onboarding</h1>
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
                disabled={loading || selectedAreas.length === 0}
                className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? 'Completing...' : (
                  <>
                    Complete
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
