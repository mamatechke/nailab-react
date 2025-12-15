import { supabase } from '../lib/supabase';

export interface MentorProfile {
  id: string;
  full_name: string;
  bio: string;
  title: string;
  organization: string;
  location: string;
  photo_url: string | null;
  linkedin_url: string | null;
  years_experience: number;
  advisory_experience: boolean;
  sectors: string[];
  expertise: string[];
  stage_preference: string[];
  availability_hours_month: number;
  rate_per_hour: number;
  pro_bono: boolean;
  preferred_mentorship_mode: string;
  profile_visibility: boolean;
}

export interface StartupProfile {
  startup_name: string;
  sector: string;
  stage: string;
  location: string;
  mentorship_areas: string[];
}

export interface MatchScore {
  mentor: MentorProfile;
  score: number;
  matchReasons: string[];
}

export class MentorshipMatchingService {
  private calculateSectorMatch(mentorSectors: string[], founderSector: string): number {
    if (!mentorSectors || !founderSector) return 0;
    return mentorSectors.includes(founderSector) ? 40 : 0;
  }

  private calculateStageMatch(mentorStages: string[], founderStage: string): number {
    if (!mentorStages || !founderStage) return 0;
    return mentorStages.includes(founderStage) ? 25 : 0;
  }

  private calculateExpertiseMatch(mentorExpertise: string[], founderNeeds: string[]): number {
    if (!mentorExpertise || !founderNeeds) return 0;

    const matchingAreas = mentorExpertise.filter(exp =>
      founderNeeds.includes(exp)
    );

    return (matchingAreas.length / Math.max(founderNeeds.length, 1)) * 30;
  }

  private calculateLocationMatch(mentorLocation: string, founderLocation: string): number {
    if (!mentorLocation || !founderLocation) return 0;

    const mentorCountry = mentorLocation.split(',').pop()?.trim();
    const founderCountry = founderLocation.split(',').pop()?.trim();

    if (mentorLocation === founderLocation) return 15;
    if (mentorCountry === founderCountry) return 10;

    const eastAfricanCountries = ['Kenya', 'Uganda', 'Tanzania', 'Rwanda', 'Burundi'];
    const westAfricanCountries = ['Nigeria', 'Ghana', 'Senegal', 'Ivory Coast'];
    const southernAfricanCountries = ['South Africa', 'Zambia', 'Zimbabwe', 'Botswana'];

    const isInSameRegion = (countries: string[]) =>
      countries.includes(mentorCountry || '') && countries.includes(founderCountry || '');

    if (isInSameRegion(eastAfricanCountries) ||
        isInSameRegion(westAfricanCountries) ||
        isInSameRegion(southernAfricanCountries)) {
      return 5;
    }

    return 0;
  }

  private getMatchReasons(
    mentor: MentorProfile,
    startup: StartupProfile,
    sectorScore: number,
    stageScore: number,
    expertiseScore: number,
    locationScore: number
  ): string[] {
    const reasons: string[] = [];

    if (sectorScore > 0) {
      reasons.push(`Expert in ${startup.sector}`);
    }

    if (stageScore > 0) {
      const stageNames: Record<string, string> = {
        idea: 'Idea Stage',
        mvp: 'Early Stage',
        growth: 'Growth Stage',
        scale: 'Scaling Stage'
      };
      reasons.push(`Experienced with ${stageNames[startup.stage] || startup.stage} startups`);
    }

    if (expertiseScore > 15) {
      const matchingAreas = mentor.expertise?.filter(exp =>
        startup.mentorship_areas?.includes(exp)
      ) || [];
      if (matchingAreas.length > 0) {
        reasons.push(`Can help with ${matchingAreas.slice(0, 2).join(' and ')}`);
      }
    }

    if (locationScore >= 10) {
      const mentorCountry = mentor.location?.split(',').pop()?.trim();
      reasons.push(`Based in ${mentorCountry}`);
    }

    if (mentor.advisory_experience) {
      reasons.push('Experienced advisor and investor');
    }

    if (mentor.pro_bono) {
      reasons.push('Offers pro bono sessions');
    }

    if (mentor.years_experience >= 10) {
      reasons.push(`${mentor.years_experience}+ years of experience`);
    }

    return reasons;
  }

  public calculateMatch(mentor: MentorProfile, startup: StartupProfile): MatchScore {
    const sectorScore = this.calculateSectorMatch(mentor.sectors, startup.sector);
    const stageScore = this.calculateStageMatch(mentor.stage_preference, startup.stage);
    const expertiseScore = this.calculateExpertiseMatch(mentor.expertise, startup.mentorship_areas);
    const locationScore = this.calculateLocationMatch(mentor.location, startup.location);

    const totalScore = sectorScore + stageScore + expertiseScore + locationScore;

    const matchReasons = this.getMatchReasons(
      mentor,
      startup,
      sectorScore,
      stageScore,
      expertiseScore,
      locationScore
    );

    return {
      mentor,
      score: Math.round(totalScore),
      matchReasons
    };
  }

  public async findMatches(
    founderId: string,
    limit: number = 10
  ): Promise<MatchScore[]> {
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', founderId)
      .maybeSingle();

    if (!profile) {
      throw new Error('Founder profile not found');
    }

    const { data: startup } = await supabase
      .from('startup_profiles')
      .select('*')
      .eq('user_id', founderId)
      .maybeSingle();

    if (!startup) {
      throw new Error('Startup profile not found');
    }

    const { data: mentors } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('role', 'mentor')
      .eq('profile_visibility', true)
      .eq('onboarding_completed', true);

    if (!mentors) {
      return [];
    }

    const existingRequests = await supabase
      .from('mentorship_requests')
      .select('mentor_id')
      .eq('founder_id', founderId);

    const requestedMentorIds = new Set(
      existingRequests.data?.map(r => r.mentor_id) || []
    );

    const matches = mentors
      .filter(mentor => !requestedMentorIds.has(mentor.id))
      .map(mentor => this.calculateMatch(mentor as MentorProfile, startup as StartupProfile))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    return matches;
  }

  public async getAllMentors(filters?: {
    sector?: string;
    expertise?: string[];
    stage?: string;
    location?: string;
    proBono?: boolean;
  }): Promise<MentorProfile[]> {
    let query = supabase
      .from('user_profiles')
      .select('*')
      .eq('role', 'mentor')
      .eq('profile_visibility', true)
      .eq('onboarding_completed', true);

    if (filters?.sector) {
      query = query.contains('sectors', [filters.sector]);
    }

    if (filters?.expertise && filters.expertise.length > 0) {
      query = query.overlaps('expertise', filters.expertise);
    }

    if (filters?.stage) {
      query = query.contains('stage_preference', [filters.stage]);
    }

    if (filters?.location) {
      query = query.ilike('location', `%${filters.location}%`);
    }

    if (filters?.proBono !== undefined) {
      query = query.eq('pro_bono', filters.proBono);
    }

    const { data } = await query.order('years_experience', { ascending: false });

    return data as MentorProfile[] || [];
  }

  public async sendMentorshipRequest(
    founderId: string,
    mentorId: string,
    message: string
  ): Promise<void> {
    const { error } = await supabase
      .from('mentorship_requests')
      .insert({
        founder_id: founderId,
        mentor_id: mentorId,
        message,
        status: 'pending'
      });

    if (error) throw error;

    await supabase
      .from('notifications')
      .insert({
        user_id: mentorId,
        type: 'request',
        title: 'New Mentorship Request',
        message: 'You have received a new mentorship request',
        link: '/dashboard'
      });
  }

  public async respondToRequest(
    requestId: string,
    status: 'accepted' | 'declined'
  ): Promise<void> {
    const { data: request, error: fetchError } = await supabase
      .from('mentorship_requests')
      .select('founder_id, mentor_id')
      .eq('id', requestId)
      .maybeSingle();

    if (fetchError || !request) throw fetchError || new Error('Request not found');

    const { error } = await supabase
      .from('mentorship_requests')
      .update({
        status,
        responded_at: new Date().toISOString()
      })
      .eq('id', requestId);

    if (error) throw error;

    if (status === 'accepted') {
      await supabase
        .from('mentorship_connections')
        .insert({
          founder_id: request.founder_id,
          mentor_id: request.mentor_id,
          request_id: requestId,
          status: 'active'
        });
    }

    await supabase
      .from('notifications')
      .insert({
        user_id: request.founder_id,
        type: 'request',
        title: `Mentorship Request ${status === 'accepted' ? 'Accepted' : 'Declined'}`,
        message: `Your mentorship request has been ${status}`,
        link: '/dashboard'
      });
  }
}

export const matchingService = new MentorshipMatchingService();
