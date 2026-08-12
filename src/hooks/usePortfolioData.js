import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { 
  personalData as fallbackPersonal, 
  skillsData as fallbackSkills, 
  projectsData as fallbackProjects, 
  experienceData as fallbackExperience, 
  educationData as fallbackEducation 
} from '../data/portfolio';

export function usePortfolioData() {
  const [data, setData] = useState({
    personalData: fallbackPersonal,
    skillsData: fallbackSkills,
    projectsData: fallbackProjects,
    experienceData: fallbackExperience,
    educationData: fallbackEducation
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!supabase) throw new Error("Supabase client not initialized");

        const [
          { data: personal },
          { data: skills },
          { data: projects },
          { data: experience },
          { data: education }
        ] = await Promise.all([
          supabase.from('personal_info').select('*').limit(1).single(),
          supabase.from('skills').select('*').order('category'),
          supabase.from('projects').select('*').order('project_id'),
          supabase.from('experience').select('*'),
          supabase.from('education').select('*')
        ]);

        if (personal) {
          setData(prev => ({
            ...prev,
            personalData: {
              name: personal.name,
              role: personal.role,
              shortStatement: personal.short_statement,
              aboutText: personal.about_text,
              email: personal.email,
              linkedin: personal.linkedin,
              github: personal.github,
              stats: {
                cgpa: personal.cgpa,
                problemsSolved: personal.problems_solved,
                educationTimeline: personal.education_timeline
              }
            }
          }));
        }

        if (skills) {
          setData(prev => ({
            ...prev,
            skillsData: skills.map(s => ({
              ...s,
              items: s.items || []
            }))
          }));
        }
        
        if (projects) {
          setData(prev => ({
            ...prev,
            projectsData: projects.map(p => ({
              id: p.project_id,
              title: p.title,
              subtitle: p.subtitle,
              description: p.description,
              technologies: p.technologies || [],
              features: p.features || [],
              theme: p.theme,
              link: p.link
            }))
          }));
        }

        if (experience) {
          setData(prev => ({
            ...prev,
            experienceData: experience.map(e => ({
              ...e,
              skills: e.skills || []
            }))
          }));
        }
        if (education) setData(prev => ({ ...prev, educationData: education }));
        
      } catch (err) {
        console.error("Error fetching portfolio data from Supabase:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { ...data, loading, error };
}
