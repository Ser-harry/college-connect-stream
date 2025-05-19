
import { College } from "@/data/collegeData";

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
) => {
  return colleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          college.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStream = filters.streams.length === 0 || filters.streams.includes(college.stream);
    
    const matchesLocation = filters.locations.length === 0 || 
                            filters.locations.some(loc => college.location.includes(loc));
    
    const matchesPriceRange = college.feesNumeric >= priceRange[0] && college.feesNumeric <= priceRange[1];

    const matchesCollegeType = filters.collegeTypes.length === 0 || 
                              filters.collegeTypes.includes(college.collegeType);
    
    const matchesExams = filters.examsAccepted.length === 0 || 
                        filters.examsAccepted.some(exam => college.examsAccepted.includes(exam));
    
    const matchesRating = college.rating >= filters.minRating;

    const matchesPlacement = college.placementRate >= placementRange[0] && 
                           college.placementRate <= placementRange[1];
    
    return matchesSearch && 
           matchesStream && 
           matchesLocation && 
           matchesPriceRange && 
           matchesCollegeType && 
           matchesExams && 
           matchesRating &&
           matchesPlacement;
  });
};

export const addAdsToColleges = (colleges: College[]) => {
  return colleges.reduce((acc: (College | { isAd: true; id: string })[], college, index) => {
    acc.push(college);
    if ((index + 1) % 5 === 0 && index < colleges.length - 1) {
      acc.push({ isAd: true, id: `ad-${Math.floor(index / 5)}` });
    }
    return acc;
  }, []);
};
