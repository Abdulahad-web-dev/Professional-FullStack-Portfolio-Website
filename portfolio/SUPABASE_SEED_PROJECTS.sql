-- Supplemental SQL Seed for Mandatory Projects

-- Clear existing projects if you want a clean start (Optional)
-- DELETE FROM public.projects;

-- 1. Amazon Clone
INSERT INTO public.projects (title, description, content, tags, color, "order", github, demo, image)
VALUES (
    'Amazon 2.0 Full-Stack Clone',
    'A high-performance Amazon clone with full checkout functionality, user authentication, and real-time order processing.',
    'This project is a detailed recreation of the Amazon shopping experience. 
Key Features:
- User Authentication with NextAuth.
- Stripe Integration for secure payments.
- Firestore Database for storing user orders.
- Redux for global state and basket management.
- Responsive design with Tailwind CSS.',
    ARRAY['Next.js', 'Redux', 'Stripe', 'Tailwind', 'Firebase'],
    '#F59E0B',
    1,
    '#', -- Placeholder: user will provide later
    '#', -- Placeholder: user will provide later
    'https://images.unsplash.com/photo-1523474253046-5cd2c48b63cd?auto=format&fit=crop&q=80&w=1000'
);

-- 2. Cloud CRUD Management System
INSERT INTO public.projects (title, description, content, tags, color, "order", github, demo, image)
VALUES (
    'Enterprise CRUD App',
    'A robust data management system with real-time updates, advanced filtering, and comprehensive user role management.',
    'A production-ready CRUD application designed for high-volume data handling.
Key Features:
- Dynamic data tables with search and multi-sort.
- User Role Based Access Control (RBAC).
- Real-time database synchronization.
- Form validation and error handling.
- Export to CSV/PDF functionality.',
    ARRAY['React', 'Node.js', 'Express', 'MongoDB', 'Chart.js'],
    '#06B6D4',
    2,
    '#', -- Placeholder: user will provide later
    '#', -- Placeholder: user will provide later
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000'
);

-- 3. Professional Portfolio (This Site)
INSERT INTO public.projects (title, description, content, tags, color, "order", github, demo, image)
VALUES (
    'Premium Developer Portfolio',
    'A 3D-integrated, high-performance portfolio website with a serverless architecture and glassmorphic UI design.',
    'This is the very site you are viewing, designed to showcase advanced front-end capabilities and BaaS integration.
Key Features:
- 3D Interactive Background (Three.js & tsParticles).
- Serverless Backend via Supabase.
- Secure Admin Dashboard for real-time updates.
- Glassmorphic UI with Framer Motion animations.
- Fully Responsive and SEO Optimized.',
    ARRAY['React 19', 'Supabase', 'Three.js', 'Framer Motion', 'Tailwind v4'],
    '#8B5CF6',
    3,
     '#', -- Placeholder: user will provide later
     '#', -- Placeholder: user will provide later
    'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1000'
);
