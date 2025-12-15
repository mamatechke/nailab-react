# Nailab Mentorship Matching System

## Overview

The Nailab platform includes a comprehensive mentorship matching system that algorithmically connects African founders with experienced mentors based on multiple criteria.

## Features

### 1. Smart Matching Algorithm

The matching algorithm scores mentor-founder compatibility based on:

- **Sector Match (40 points)**: Exact match between mentor's sectors and founder's industry
- **Stage Match (25 points)**: Alignment between mentor's stage preference and startup stage
- **Expertise Match (30 points)**: Overlap between mentor's expertise and founder's mentorship needs
- **Location Match (15 points)**: Geographic proximity with regional grouping
  - Same city: 15 points
  - Same country: 10 points
  - Same region (East/West/Southern Africa): 5 points

**Maximum Score: 110 points**

### 2. Mentor Discovery

#### For Founders:
- **Recommended Matches**: AI-powered recommendations showing top-scored mentors
- **Browse All**: Complete mentor directory with advanced filtering
- **Match Reasons**: Clear explanations of why each mentor is recommended

#### Advanced Filters:
- Industry/Sector
- Expertise areas (14 categories)
- Location
- Rate type (Pro bono vs. Paid)
- Startup stage preference

### 3. Mentorship Requests

#### Founder Flow:
1. Browse recommended or all mentors
2. View detailed mentor profiles
3. Send personalized mentorship request
4. Track request status (pending/accepted/declined)
5. Receive notifications on response

#### Mentor Flow:
1. Receive mentorship requests with founder details
2. View founder's startup profile and needs
3. Accept or decline requests
4. Automatic connection creation on acceptance
5. View history of all requests

### 4. Profile Visibility Management

Mentors can control:
- Profile visibility (public/private)
- Availability hours per month
- Session rates (or pro bono)
- Preferred mentorship mode (virtual/in-person/both)

## Seed Data

### African Mentors (8 profiles)

1. **Amina Odhiambo** - Kenyan Fintech Expert
   - Location: Nairobi, Kenya
   - Expertise: Fintech, Mobile Money, Fundraising
   - Rate: $150/hr

2. **Chukwudi Eze** - Nigerian Agritech Leader
   - Location: Lagos, Nigeria
   - Expertise: Agritech, Supply Chain, Business Model
   - Pro Bono

3. **Thandiwe Nkosi** - South African Healthtech CEO
   - Location: Cape Town, South Africa
   - Expertise: Healthtech, Fundraising, Team Building
   - Rate: $200/hr

4. **Kwame Asante** - Ghanaian Edutech Entrepreneur
   - Location: Accra, Ghana
   - Expertise: Edutech, Product-Market Fit, Sales
   - Rate: $100/hr

5. **Grace Uwase** - Rwandan SaaS Founder
   - Location: Kigali, Rwanda
   - Expertise: SaaS, Product Development, B2B Sales
   - Pro Bono

6. **Omar Hassan** - Egyptian E-commerce Expert
   - Location: Cairo, Egypt
   - Expertise: E-commerce, Market Expansion, Logistics
   - Rate: $180/hr

7. **Sarah Nansubuga** - Ugandan Mobile Tech Leader
   - Location: Kampala, Uganda
   - Expertise: Mobile-first Products, Product Development
   - Rate: $120/hr

8. **Mamadou Diop** - Senegalese Climate Tech Investor
   - Location: Dakar, Senegal
   - Expertise: Cleantech, Impact Investing, Fundraising
   - Pro Bono

### African Founders (8 profiles)

1. **James Mwangi** - FarmLink Kenya (Agritech)
   - Stage: MVP, Pre-seed funded
   - Needs: Market access, Fundraising, Product-market fit

2. **Ngozi Okafor** - DiagnoAI (Healthtech + AI)
   - Stage: MVP, Seed funded
   - Needs: Regulatory guidance, Product dev, Partnerships

3. **Lerato Mokoena** - Township Capital (Fintech)
   - Stage: Growth, Seed funded
   - Needs: Financial management, Expansion, Team building

4. **Ama Osei** - BrainBoost Africa (Edutech)
   - Stage: MVP, Bootstrapped
   - Needs: Product-market fit, Sales, Go-to-market

5. **Eric Habimana** - TradeHub East Africa (E-commerce)
   - Stage: Growth, Series A funded
   - Needs: Market expansion, Partnerships, Team building

6. **Fatuma Ally** - SwiftRoute (Mobility & Logistics)
   - Stage: MVP, Pre-seed funded
   - Needs: Product development, Customer access, Fundraising

7. **Dawit Tekle** - BioEnergy Ethiopia (Cleantech)
   - Stage: Growth, Seed funded
   - Needs: Business model, Partnerships, Financial management

8. **Mwila Banda** - CountRight (SaaS)
   - Stage: MVP, Bootstrapped
   - Needs: Go-to-market, Marketing, Sales

## Loading Seed Data

To populate your database with seed data:

```bash
# Using Supabase CLI
supabase db reset
psql -h <your-db-host> -U postgres -d postgres -f seed-data.sql

# Or through Supabase Dashboard
# 1. Go to SQL Editor
# 2. Copy content from seed-data.sql
# 3. Run the query
```

## API Usage

### Find Matches for a Founder

```typescript
import { matchingService } from './services/matchingService';

// Get top 10 matches
const matches = await matchingService.findMatches(founderId, 10);

// Returns array of:
// {
//   mentor: MentorProfile,
//   score: number,
//   matchReasons: string[]
// }
```

### Browse All Mentors with Filters

```typescript
const mentors = await matchingService.getAllMentors({
  sector: 'Fintech',
  expertise: ['Fundraising', 'Product-market fit'],
  stage: 'mvp',
  location: 'Kenya',
  proBono: true
});
```

### Send Mentorship Request

```typescript
await matchingService.sendMentorshipRequest(
  founderId,
  mentorId,
  'I would love to learn from your experience in fintech...'
);
```

### Respond to Request (Mentor)

```typescript
await matchingService.respondToRequest(requestId, 'accepted');
// or
await matchingService.respondToRequest(requestId, 'declined');
```

## Database Schema

### Key Tables

- `user_profiles`: Stores both founder and mentor profiles
- `startup_profiles`: Additional startup-specific information
- `mentorship_requests`: Tracks all mentorship requests
- `mentorship_connections`: Active mentor-founder relationships
- `notifications`: System notifications

## Matching Score Examples

### High Match (85-110 points)
- Same sector (40)
- Same stage preference (25)
- 2+ overlapping expertise areas (20-30)
- Same region (5-15)

### Medium Match (50-84 points)
- Different sector but relevant expertise
- Partial stage alignment
- Geographic proximity

### Low Match (0-49 points)
- Minimal overlap
- Different focus areas
- No geographic proximity

## UI Components

### BrowseMentors Page
- Toggle between "Recommended" and "Browse All"
- Advanced filtering sidebar
- Match score and reasons displayed
- Request mentorship modal

### MentorshipRequests Component
- Used in Dashboard for both roles
- Filter by status (all/pending/accepted/declined)
- Accept/Decline actions for mentors
- Status tracking for founders

### Dashboard Integration
- Real-time request management
- Quick actions for both roles
- Statistics and metrics

## Best Practices

1. **For Founders**: Complete your onboarding thoroughly for better matches
2. **For Mentors**: Keep expertise areas and preferences updated
3. **Profile Visibility**: Mentors should enable visibility to be discoverable
4. **Request Messages**: Personalized requests get better response rates
5. **Timely Responses**: Mentors should respond to requests within 7 days

## Future Enhancements

- ML-based matching refinement
- Session scheduling integration
- Success metrics tracking
- Mentor ratings and reviews
- Advanced search with natural language
- Integration with calendar apps
