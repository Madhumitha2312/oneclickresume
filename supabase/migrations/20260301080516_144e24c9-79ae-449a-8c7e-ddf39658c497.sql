
-- Create a secure view for public resume access that only exposes safe fields
CREATE VIEW public.public_resumes
WITH (security_invoker = on) AS
SELECT 
  id,
  user_id,
  title,
  template,
  slug,
  created_at,
  updated_at,
  jsonb_build_object(
    'personalInfo', jsonb_build_object(
      'firstName', resume_data->'personalInfo'->'firstName',
      'lastName', resume_data->'personalInfo'->'lastName',
      'headline', resume_data->'personalInfo'->'headline',
      'summary', resume_data->'personalInfo'->'summary'
    ),
    'experience', resume_data->'experience',
    'education', resume_data->'education',
    'skills', resume_data->'skills',
    'certifications', resume_data->'certifications',
    'languages', resume_data->'languages',
    'projects', resume_data->'projects'
  ) as resume_data
FROM public.resumes 
WHERE is_public = true;

-- Drop the overly permissive public SELECT policy on resumes base table
DROP POLICY IF EXISTS "Public resumes visible to all" ON public.resumes;

-- Grant SELECT on the view to anon and authenticated roles
GRANT SELECT ON public.public_resumes TO anon;
GRANT SELECT ON public.public_resumes TO authenticated;
