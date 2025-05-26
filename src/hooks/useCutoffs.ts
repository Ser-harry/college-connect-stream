
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Cutoff {
  id: string;
  college_id: number;
  branch: string;
  category: string;
  cutoff_mark: number;
  year: number;
  created_at: string;
}

export const useCutoffs = (collegeId?: number, category?: string) => {
  return useQuery({
    queryKey: ['cutoffs', collegeId, category],
    queryFn: async (): Promise<Cutoff[]> => {
      console.log('Fetching cutoffs from Supabase...');
      let query = supabase.from('cutoffs').select('*');
      
      if (collegeId) {
        query = query.eq('college_id', collegeId);
      }
      
      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query
        .order('cutoff_mark', { ascending: false })
        .eq('year', 2024);

      if (error) {
        console.error('Error fetching cutoffs:', error);
        throw error;
      }

      console.log('Fetched cutoffs:', data);
      return data || [];
    },
  });
};
