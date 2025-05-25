
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface College {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  stream: string;
  courses: number;
  fees: string;
  fees_numeric: number;
  ranking: string;
  college_type: string;
  exams_accepted: string[];
  placement_rate: number;
}

export const useColleges = () => {
  return useQuery({
    queryKey: ['colleges'],
    queryFn: async (): Promise<College[]> => {
      console.log('Fetching colleges from Supabase...');
      const { data, error } = await supabase
        .from('colleges')
        .select('*')
        .order('id');

      if (error) {
        console.error('Error fetching colleges:', error);
        throw error;
      }

      console.log('Fetched colleges:', data);
      return data || [];
    },
  });
};
