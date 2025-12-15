-- Seed Data for Nailab Platform
-- African Founders and Mentors with realistic profiles

-- First, let's create some test user accounts (these would normally come from auth.users)
-- We'll insert user_profiles directly with mock IDs

-- MENTORS DATA
INSERT INTO user_profiles (id, role, full_name, bio, title, organization, location, linkedin_url, years_experience, advisory_experience, sectors, expertise, stage_preference, availability_hours_month, rate_per_hour, pro_bono, preferred_mentorship_mode, mentorship_approach, motivation, profile_visibility, onboarding_completed)
VALUES
-- Kenyan Fintech Expert
('11111111-1111-1111-1111-111111111111', 'mentor', 'Amina Odhiambo', 'Seasoned fintech entrepreneur with 12 years building payment solutions across East Africa. Successfully scaled two startups and exited one to a major telecom. Passionate about financial inclusion.', 'Founder & CEO', 'Pesa Tech Solutions', 'Nairobi, Kenya', 'https://linkedin.com/in/aminaodhiambo', 12, true,
  ARRAY['Fintech', 'Mobiletech', 'SaaS'],
  ARRAY['Pitching, fundraising, and investor readiness', 'Product-market fit', 'Go-to-market planning and launch', 'Market expansion (local or regional)'],
  ARRAY['mvp', 'growth', 'scale'], 10, 150.00, false, 'both',
  'I believe in practical, hands-on mentorship. I work with founders to break down complex challenges into actionable steps, leveraging my network and experience to open doors.',
  'I want to give back to the ecosystem that supported me. Africa''s fintech revolution is just beginning, and I want to help more founders succeed.',
  true, true),

-- Nigerian Agritech Mentor
('22222222-2222-2222-2222-222222222222', 'mentor', 'Chukwudi Eze', 'Agricultural economist turned entrepreneur. Built Nigeria''s largest farm-to-market platform. Expert in agricultural value chains, logistics, and scaling operations across West Africa.', 'Co-founder & Chief Strategy Officer', 'FarmConnect Africa', 'Lagos, Nigeria', 'https://linkedin.com/in/chukwudieze', 15, true,
  ARRAY['Agritech', 'Mobility & Logisticstech', 'E-commerce & Retailtech'],
  ARRAY['Business model refinement', 'Access to customers and markets', 'Strategic partnerships and collaborations', 'Budgeting and financial management'],
  ARRAY['idea', 'mvp', 'growth'], 8, 0.00, true, 'virtual',
  'My approach is collaborative and data-driven. I help founders validate assumptions, build sustainable business models, and navigate the unique challenges of agricultural markets.',
  'Agriculture is Africa''s backbone. I mentor to accelerate innovation in this critical sector and help founders avoid the mistakes I made.',
  true, true),

-- South African Healthtech Expert
('33333333-3333-3333-3333-333333333333', 'mentor', 'Thandiwe Nkosi', 'Medical doctor and health tech innovator with deep experience in telemedicine and health insurance tech. Raised Series B funding and built teams across 5 African countries.', 'CEO & Founder', 'HealthBridge Africa', 'Cape Town, South Africa', 'https://linkedin.com/in/thandiwenkosi', 10, true,
  ARRAY['Healthtech', 'SaaS', 'AI & ML'],
  ARRAY['Pitching, fundraising, and investor readiness', 'Team building and HR', 'Product development', 'Legal or regulatory guidance'],
  ARRAY['mvp', 'growth', 'scale'], 12, 200.00, false, 'both',
  'I focus on strategic thinking and execution excellence. My sessions combine practical advice with accountability, ensuring founders make real progress between meetings.',
  'Healthcare innovation can save lives. I mentor to accelerate solutions that improve health outcomes across Africa.',
  true, true),

-- Ghanaian Edutech Mentor
('44444444-4444-4444-4444-444444444444', 'mentor', 'Kwame Asante', 'Former teacher turned edtech entrepreneur. Built Ghana''s leading online learning platform serving 500K+ students. Angel investor in 8 African startups.', 'Managing Partner', 'Learn Africa Ventures', 'Accra, Ghana', 'https://linkedin.com/in/kwameasante', 8, true,
  ARRAY['Edutech', 'SaaS', 'Creative & Mediatech'],
  ARRAY['Product-market fit', 'Sales and customer acquisition', 'Marketing and branding', 'Leadership and personal growth'],
  ARRAY['idea', 'mvp', 'growth'], 6, 100.00, false, 'virtual',
  'I believe in founder-first mentorship. I listen deeply, ask tough questions, and help founders discover their own solutions while sharing relevant experiences.',
  'Education transforms lives. I want to help more edtech founders succeed in making quality education accessible across Africa.',
  true, true),

-- Rwandan Female Tech Leader
('55555555-5555-5555-5555-555555555555', 'mentor', 'Grace Uwase', 'Software engineer and serial entrepreneur. Built and sold a SaaS company. Now angel investor and advocate for women in tech. Expertise in B2B SaaS and enterprise sales.', 'Founder', 'TechHer Africa', 'Kigali, Rwanda', 'https://linkedin.com/in/graceuwase', 9, true,
  ARRAY['SaaS', 'Fintech', 'E-commerce & Retailtech'],
  ARRAY['Product development', 'Go-to-market planning and launch', 'Sales and customer acquisition', 'Team building and HR'],
  ARRAY['idea', 'mvp', 'growth'], 10, 0.00, true, 'both',
  'I practice empathetic mentorship with high standards. I create safe spaces for founders to be vulnerable while pushing them to achieve their full potential.',
  'As a woman who overcame many barriers, I want to mentor the next generation of diverse tech founders across Africa.',
  true, true),

-- Egyptian E-commerce Expert
('66666666-6666-6666-6666-666666666666', 'mentor', 'Omar Hassan', 'E-commerce pioneer with 14 years experience building online marketplaces in MENA region. Scaled operations to 8 countries. Expert in logistics, payments, and cross-border commerce.', 'Chief Commercial Officer', 'Souq Africa', 'Cairo, Egypt', 'https://linkedin.com/in/omarhassan', 14, true,
  ARRAY['E-commerce & Retailtech', 'Mobility & Logisticstech', 'Fintech'],
  ARRAY['Market expansion (local or regional)', 'Strategic partnerships and collaborations', 'Budgeting and financial management', 'Access to customers and markets'],
  ARRAY['growth', 'scale'], 8, 180.00, false, 'virtual',
  'I take a systematic approach to mentorship, focusing on metrics and operational excellence. I help founders build scalable systems and processes.',
  'E-commerce is transforming African retail. I mentor to share lessons learned and help founders scale faster and smarter.',
  true, true),

-- Ugandan Mobile Tech Mentor
('77777777-7777-7777-7777-777777777777', 'mentor', 'Sarah Nansubuga', 'Mobile-first product leader with expertise in building for emerging markets. Led product at major African tech company. Deep understanding of mobile money, USSD, and low-bandwidth solutions.', 'VP of Product', 'Mobile Innovations Ltd', 'Kampala, Uganda', 'https://linkedin.com/in/sarahnansubuga', 7, true,
  ARRAY['Mobiletech', 'Fintech', 'SaaS'],
  ARRAY['Product-market fit', 'Product development', 'Go-to-market planning and launch', 'Access to customers and markets'],
  ARRAY['idea', 'mvp', 'growth'], 6, 120.00, false, 'both',
  'I believe in rapid experimentation and learning. I help founders test assumptions quickly, iterate based on user feedback, and build products people love.',
  'Mobile technology is the gateway to digital services in Africa. I mentor to help founders build truly mobile-first solutions.',
  true, true),

-- Senegalese Climate Tech Investor
('88888888-8888-8888-8888-888888888888', 'mentor', 'Mamadou Diop', 'Clean energy entrepreneur and impact investor. Built solar energy company serving 100K+ households. Now investing in climate tech across francophone Africa.', 'Managing Director', 'Green Future Capital', 'Dakar, Senegal', 'https://linkedin.com/in/mamadoudiop', 11, true,
  ARRAY['Cleantech', 'Agritech', 'SaaS'],
  ARRAY['Pitching, fundraising, and investor readiness', 'Business model refinement', 'Strategic partnerships and collaborations', 'Leadership and personal growth'],
  ARRAY['mvp', 'growth', 'scale'], 10, 0.00, true, 'both',
  'I combine business acumen with impact focus. I help founders build profitable businesses that also create positive environmental and social impact.',
  'Climate change affects Africa disproportionately. I mentor to accelerate climate solutions and sustainable business models.',
  true, true);

-- FOUNDERS DATA
INSERT INTO user_profiles (id, role, full_name, phone_number, bio, location, sectors, preferred_mentorship_mode, onboarding_completed)
VALUES
-- Kenyan Agritech Founder
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'founder', 'James Mwangi', '+254722123456', 'Agricultural engineer passionate about using technology to connect smallholder farmers to markets. Building a platform to revolutionize agricultural supply chains.', 'Nakuru, Kenya', ARRAY['Agritech'], 'virtual', true),

-- Nigerian Healthtech Founder
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'founder', 'Ngozi Okafor', '+234803456789', 'Medical lab scientist building AI-powered diagnostic tools for resource-limited settings. Determined to make quality healthcare accessible across Nigeria.', 'Abuja, Nigeria', ARRAY['Healthtech', 'AI & ML'], 'both', true),

-- South African Fintech Founder
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'founder', 'Lerato Mokoena', '+27823456789', 'Former banker building a digital lending platform for SMEs in townships. Passionate about financial inclusion and empowering underserved communities.', 'Johannesburg, South Africa', ARRAY['Fintech'], 'in_person', true),

-- Ghanaian Edutech Founder
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'founder', 'Ama Osei', '+233244123456', 'Educator and software developer creating adaptive learning platforms for African students. Focused on STEM education and bridging the digital divide.', 'Kumasi, Ghana', ARRAY['Edutech'], 'virtual', true),

-- Rwandan E-commerce Founder
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'founder', 'Eric Habimana', '+250788123456', 'Serial entrepreneur building a B2B e-commerce platform connecting manufacturers with retailers across East Africa. Passionate about trade and economic integration.', 'Kigali, Rwanda', ARRAY['E-commerce & Retailtech'], 'both', true),

-- Tanzanian Mobility Tech Founder
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'founder', 'Fatuma Ally', '+255754123456', 'Transportation logistics expert building smart routing solutions for last-mile delivery in African cities. Focused on reducing costs and improving efficiency.', 'Dar es Salaam, Tanzania', ARRAY['Mobility & Logisticstech'], 'virtual', true),

-- Ethiopian Cleantech Founder
('aaaabbbb-cccc-dddd-eeee-111122223333', 'founder', 'Dawit Tekle', '+251911123456', 'Environmental engineer developing affordable biogas solutions for rural households. Committed to clean energy access and reducing deforestation.', 'Addis Ababa, Ethiopia', ARRAY['Cleantech'], 'virtual', true),

-- Zambian SaaS Founder
('bbbbcccc-dddd-eeee-ffff-222233334444', 'founder', 'Mwila Banda', '+260977123456', 'Software engineer building cloud-based accounting tools for African SMEs. Focused on simplifying business management for non-technical entrepreneurs.', 'Lusaka, Zambia', ARRAY['SaaS'], 'both', true);

-- STARTUP PROFILES
INSERT INTO startup_profiles (user_id, startup_name, description, sector, stage, location, target_market, value_proposition, funding_stage, funding_raised, mentorship_areas, challenge_details, preferred_mentorship_mode, phone_number)
VALUES
-- James Mwangi - Agritech
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'FarmLink Kenya', 'Digital platform connecting smallholder farmers directly to buyers, eliminating middlemen and ensuring fair prices. We provide market information, logistics support, and mobile payment integration.', 'Agritech', 'mvp', 'Nakuru, Kenya',
  'Smallholder farmers (25-60 years) in Central and Rift Valley regions, growing vegetables, dairy, and grains. Also targeting urban retailers and restaurants seeking fresh produce.',
  'We eliminate 3-4 layers of middlemen, increasing farmer income by 40% while reducing costs for buyers by 25%. Our mobile-first platform works offline and integrates with M-Pesa for instant payments.',
  'pre_seed', 50000,
  ARRAY['Access to customers and markets', 'Pitching, fundraising, and investor readiness', 'Product-market fit'],
  'Need help acquiring our first 500 farmers and 50 buyer accounts. Also preparing for seed round and refining our unit economics to achieve profitability.',
  'virtual', '+254722123456'),

-- Ngozi Okafor - Healthtech
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'DiagnoAI', 'AI-powered diagnostic platform that analyzes medical images and lab results to assist healthcare workers in resource-limited settings. Improving accuracy and speed of diagnoses across Nigeria.', 'Healthtech', 'mvp', 'Abuja, Nigeria',
  'Primary healthcare centers, general hospitals, and diagnostic labs across Nigeria serving middle and low-income patients. Secondary market includes telemedicine platforms.',
  'Our AI achieves 94% accuracy in detecting common diseases from medical images, matching specialist-level diagnosis at 1/10th the cost. Works offline and requires minimal training.',
  'seed', 180000,
  ARRAY['Legal or regulatory guidance', 'Product development', 'Strategic partnerships and collaborations'],
  'Navigating medical device regulations and obtaining necessary certifications. Need partnerships with hospital networks and help scaling our AI model with more training data.',
  'both', '+234803456789'),

-- Lerato Mokoena - Fintech
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Township Capital', 'Digital lending platform providing working capital loans to informal sector SMEs in South African townships. Using alternative data and mobile technology to serve the underbanked.', 'Fintech', 'growth', 'Johannesburg, South Africa',
  'Informal sector entrepreneurs (30-55 years) in townships, running spaza shops, salons, mechanics, and catering businesses. Need working capital of R5,000-R50,000.',
  'We use alternative credit scoring (mobile money, utility payments, business location data) to serve borrowers rejected by banks. 72-hour approval, 95% digital process, flexible repayment.',
  'seed', 350000,
  ARRAY['Budgeting and financial management', 'Market expansion (local or regional)', 'Team building and HR'],
  'Managing rapid growth while maintaining loan quality. Need to expand to other provinces and build operations team. Also improving our credit risk models to reduce default rates.',
  'in_person', '+27823456789'),

-- Ama Osei - Edutech
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'BrainBoost Africa', 'Adaptive learning platform for STEM subjects, personalizing content based on student performance. Gamified lessons work on low-end devices and support offline learning for African students.', 'Edutech', 'mvp', 'Kumasi, Ghana',
  'Junior and senior high school students (12-18 years) across Ghana, particularly in peri-urban and rural areas with limited access to quality STEM teachers.',
  'Our adaptive engine identifies knowledge gaps and personalizes learning paths, improving test scores by average 35%. Works on basic smartphones, costs 80% less than tutoring, and engages students through gamification.',
  'bootstrapped', 25000,
  ARRAY['Product-market fit', 'Sales and customer acquisition', 'Go-to-market planning and launch'],
  'Struggling with B2C customer acquisition and retention. Exploring B2B model with schools but need help with pricing, sales strategy, and demonstrating impact to school administrators.',
  'virtual', '+233244123456'),

-- Eric Habimana - E-commerce
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'TradeHub East Africa', 'B2B e-commerce and logistics platform connecting manufacturers and wholesalers with retailers across East Africa. Simplifying cross-border trade and last-mile delivery in the region.', 'E-commerce & Retailtech', 'growth', 'Kigali, Rwanda',
  'Small and medium retailers across Rwanda, Kenya, Uganda, and Tanzania. Also targeting manufacturers and wholesalers seeking regional distribution.',
  'Single platform for discovering products, ordering, payments, customs clearance, and delivery across East Africa. Reduce procurement costs by 30% and delivery time by 50% compared to traditional distributors.',
  'series_a', 1200000,
  ARRAY['Market expansion (local or regional)', 'Strategic partnerships and collaborations', 'Team building and HR'],
  'Scaling operations across 4 countries with different regulations, currencies, and logistics challenges. Need help building country teams, managing working capital, and forming strategic partnerships with logistics providers.',
  'both', '+250788123456'),

-- Fatuma Ally - Mobility & Logistics
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'SwiftRoute', 'AI-powered routing and fleet management platform optimizing last-mile delivery in African cities. Helping logistics companies reduce costs while improving delivery speed and reliability.', 'Mobility & Logisticstech', 'mvp', 'Dar es Salaam, Tanzania',
  'Logistics and delivery companies, e-commerce platforms, and large retailers operating in Dar es Salaam and other major East African cities.',
  'Our AI considers traffic patterns, road conditions, delivery windows, and vehicle capacity to optimize routes, reducing fuel costs by 25% and increasing daily deliveries per vehicle by 40%.',
  'pre_seed', 75000,
  ARRAY['Product development', 'Access to customers and markets', 'Pitching, fundraising, and investor readiness'],
  'Need to improve our AI model with more local data and expand features. Struggling to acquire enterprise customers and demonstrate ROI. Preparing for seed round to fund expansion.',
  'virtual', '+255754123456'),

-- Dawit Tekle - Cleantech
('aaaabbbb-cccc-dddd-eeee-111122223333', 'BioEnergy Ethiopia', 'Affordable biogas systems converting agricultural and household waste into clean cooking fuel for rural households. Reducing deforestation and indoor air pollution across Ethiopia.', 'Cleantech', 'growth', 'Addis Ababa, Ethiopia',
  'Rural households (5+ members) in agricultural regions, currently using firewood or charcoal. Also targeting small-scale farmers seeking organic fertilizer from biogas by-product.',
  'Our modular biogas systems cost 60% less than competitors, pay for themselves in 2 years through fuel savings, and produce organic fertilizer. Zero emissions cooking fuel improving health and environment.',
  'seed', 280000,
  ARRAY['Business model refinement', 'Strategic partnerships and collaborations', 'Budgeting and financial management'],
  'Exploring financing models (pay-as-you-go, microfinance partnerships) to make systems affordable. Need help structuring deals with NGOs and government programs, and managing cash flow as we scale manufacturing.',
  'virtual', '+251911123456'),

-- Mwila Banda - SaaS
('bbbbcccc-dddd-eeee-ffff-222233334444', 'CountRight', 'Cloud-based accounting and business management software designed for African SMEs. Simple interface, mobile-first, works offline, and supports multiple currencies and tax systems.', 'SaaS', 'mvp', 'Lusaka, Zambia',
  'SME owners across Southern Africa (retail shops, service businesses, distributors) with 1-50 employees, seeking affordable alternatives to complex accounting software.',
  'Built specifically for African businesses - handles cash transactions, multiple currencies, mobile money, and local tax requirements. 10x cheaper than traditional accounting software, no accounting knowledge required.',
  'bootstrapped', 15000,
  ARRAY['Go-to-market planning and launch', 'Marketing and branding', 'Sales and customer acquisition'],
  'Completed MVP and have 50 paying customers but growth is slow. Need help with marketing strategy, pricing optimization, and customer acquisition channels. Also seeking advice on when and how much to raise.',
  'both', '+260977123456');
