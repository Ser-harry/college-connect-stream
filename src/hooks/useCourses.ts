
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Course {
  id: string;
  college_id: number;
  course_name: string;
  duration: string;
  fees_per_year: number;
  seats_available: number | null;
  eligibility: string | null;
  created_at: string;
}

export const useCourses = (collegeId?: number) => {
  return useQuery({
    queryKey: ['courses', collegeId],
    queryFn: async (): Promise<Course[]> => {
      console.log('Fetching courses from Supabase...');
      let query = supabase.from('courses').select('*');
      
      if (collegeId) {
        query = query.eq('college_id', collegeId);
      }

      const { data, error } = await query.order('course_name');

      if (error) {
        console.error('Error fetching courses:', error);
        throw error;
      }

      console.log('Fetched courses:', data);
      return data || [];
    },
  });
};
