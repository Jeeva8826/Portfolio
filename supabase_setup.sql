-- Run this entirely in the Supabase SQL Editor

-- 1. Create tables
CREATE TABLE personal_info (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    role TEXT,
    short_statement TEXT,
    about_text TEXT,
    email TEXT,
    linkedin TEXT,
    github TEXT,
    cgpa TEXT,
    problems_solved TEXT,
    education_timeline TEXT
);

CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category TEXT NOT NULL,
    items TEXT[] NOT NULL
);

CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT,
    description TEXT,
    technologies TEXT[],
    features TEXT[],
    theme TEXT
);

CREATE TABLE experience (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    role TEXT NOT NULL,
    company TEXT,
    description TEXT,
    skills TEXT[]
);

CREATE TABLE education (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution TEXT NOT NULL,
    degree TEXT,
    duration TEXT,
    cgpa TEXT
);

-- 2. Insert initial data from your portfolio.js
INSERT INTO personal_info (name, role, short_statement, about_text, email, linkedin, github, cgpa, problems_solved, education_timeline)
VALUES (
    'Jeevananth C', 
    'Computer Science Student | AI & Cybersecurity Enthusiast | Software Developer', 
    'Building intelligent systems. Securing what matters.', 
    'I build intelligent systems where software, AI and cybersecurity meet. As a Computer Science student, I am passionate about exploring the intersection of these fields to create secure, efficient, and accessible digital experiences.', 
    'jeevananth1234@gmail.com', 
    'https://www.linkedin.com/in/jeeva821', 
    'https://github.com/Jeeva8826', 
    '8.55', 
    '100+', 
    '2024–2028'
);

INSERT INTO skills (category, items)
VALUES 
    ('Languages', ARRAY['Python', 'Java', 'C', 'JavaScript', 'HTML', 'CSS']),
    ('Frameworks', ARRAY['Django', 'Flask', 'FastAPI', 'React']),
    ('AI / ML', ARRAY['PyTorch', 'TensorFlow', 'Machine Learning', 'Computer Vision', 'YOLO']),
    ('Cybersecurity', ARRAY['Network Security', 'Nmap', 'Wireshark', 'Gobuster', 'Security Testing']),
    ('Tools', ARRAY['Git', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis', 'Kafka']);

INSERT INTO projects (project_id, title, subtitle, description, technologies, features, theme)
VALUES 
    ('01', 'VAYUNTRA', 'AI-DRIVEN CYBER DEFENSE PLATFORM', 'An AI-driven cyber defense platform focused on anomaly detection, behavioral analysis and automated response for critical infrastructure.', ARRAY['Python', 'FastAPI', 'PyTorch', 'Isolation Forest', 'SVM', 'Docker', 'Kubernetes', 'Kafka', 'PostgreSQL', 'Redis'], NULL, 'cyber'),
    ('02', 'VOICE-BASED ACCESSIBLE E-COMMERCE', 'ACCESSIBLE SHOPPING', 'An accessible e-commerce platform designed to help users with motor impairments interact with online shopping through voice-based interaction.', ARRAY['Python', 'Flask', 'JavaScript', 'Web Speech API', 'HTML', 'CSS'], ARRAY['Voice interaction', 'Accessibility', 'Voice feedback', 'Accessible navigation', 'Secure checkout'], 'minimal'),
    ('03', 'WAVE WARDEN', 'WATER TRACKING WEB APPLICATION', 'A dashboard-based water tracking application that helps users monitor and manage daily water intake.', ARRAY['Django', 'HTML', 'CSS', 'Bootstrap', 'JavaScript'], NULL, 'water'),
    ('04', 'LIBRARY MANAGEMENT SYSTEM', 'OPERATIONS PLATFORM', 'A software system for managing books, users, borrowing and library operations.', ARRAY['Java', 'SQL'], NULL, 'simple');

INSERT INTO experience (role, company, description, skills)
VALUES 
    ('Cybersecurity Virtual Internship', 'ShadowFox', 'Conducted network reconnaissance, port scanning, directory enumeration, and network traffic analysis using industry-standard cybersecurity tools.', ARRAY['Nmap', 'Wireshark', 'Network Analysis']);

INSERT INTO education (institution, degree, duration, cgpa)
VALUES 
    ('Dr.N.G.P Institute of Technology', 'B.E Computer Science Engineering', '2024–2028', '8.55');


-- 3. Set up Row Level Security (RLS) to make it safe!
-- Enable RLS on all tables
ALTER TABLE personal_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;

-- Create policies to allow ANYONE to read the data (SELECT)
CREATE POLICY "Public read access for personal_info" ON personal_info FOR SELECT USING (true);
CREATE POLICY "Public read access for skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Public read access for projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read access for experience" ON experience FOR SELECT USING (true);
CREATE POLICY "Public read access for education" ON education FOR SELECT USING (true);

-- No insert/update/delete policies are created for public, 
-- meaning ONLY authenticated admins in the Supabase dashboard can edit the data!
