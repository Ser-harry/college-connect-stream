
import { College } from "@/hooks/useColleges";

export interface Filters {
  streams: string[];
  locations: string[];
  collegeTypes: string[];
  examsAccepted: string[];
  minRating: number;
}

export const filterColleges = (
  colleges: College[],
  searchTerm: string,
  filters: Filters,
  priceRange: [number, number],
  placementRange: [number, number]
): College[] => {
  return colleges.filter((college) => {
    // Search term filter
    if (searchTerm && !college.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !college.location.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    // Stream filter
    if (filters.streams.length > 0 && !filters.streams.includes(college.stream)) {
      return false;
    }

    // Location filter
    if (filters.locations.length > 0 && !filters.locations.includes(college.location)) {
      return false;
    }

    // College type filter
    if (filters.collegeTypes.length > 0 && !filters.collegeTypes.includes(college.college_type)) {
      return false;
    }

    // Exams accepted filter
    if (filters.examsAccepted.length > 0) {
      const hasMatchingExam = filters.examsAccepted.some(exam => 
        college.exams_accepted.includes(exam)
      );
      if (!hasMatchingExam) {
        return false;
      }
    }

    // Rating filter
    if (filters.minRating > 0 && college.rating < filters.minRating) {
      return false;
    }

    // Price range filter
    if (college.fees_numeric < priceRange[0] || college.fees_numeric > priceRange[1]) {
      return false;
    }

    // Placement range filter
    if (college.placement_rate < placementRange[0] || college.placement_rate > placementRange[1]) {
      return false;
    }

    return true;
  });
};

export const addAdsToColleges = (colleges: College[]): (College | { isAd: true; id: string })[] => {
  const result: (College | { isAd: true; id: string })[] = [];
  
  colleges.forEach((college, index) => {
    result.push(college);
    
    // Add ad after every 3rd college
    if ((index + 1) % 3 === 0) {
      result.push({ isAd: true, id: `ad-${index}` });
    }
  });
  
  return result;
};
