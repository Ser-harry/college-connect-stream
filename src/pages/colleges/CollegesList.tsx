
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { useColleges } from "@/hooks/useColleges";
import { filterColleges, addAdsToColleges, Filters } from "@/utils/filterUtils";
import CollegeFilters from "@/components/colleges/CollegeFilters";
import CollegeListView from "@/components/colleges/CollegeListView";

const CollegesList = () => {
  const { stream } = useParams();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Filters>({
    streams: [],
    locations: [],
    collegeTypes: [],
    examsAccepted: [],
    minRating: 0
  });
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([40000, 60000]);
  const [placementRange, setPlacementRange] = useState<[number, number]>([80, 100]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  const { data: collegeData = [], isLoading, error } = useColleges();
  
  // Set initial stream filter based on URL parameter
  useEffect(() => {
    if (stream) {
      console.log("Stream parameter detected:", stream);
      
      // Convert URL format (e.g., "engineering") to display format (e.g., "Engineering")
      let formattedStream = stream.charAt(0).toUpperCase() + stream.slice(1);
      
      // Handle specific URL formats like "arts-science"
      if (formattedStream === "Arts-science") {
        formattedStream = "Arts & Science";
      }
      
      console.log("Setting stream filter to:", formattedStream);
      
      setFilters(prev => ({
        ...prev,
        streams: [formattedStream]
      }));
    } else {
      console.log("No stream parameter, clearing stream filters");
      setFilters(prev => ({
        ...prev,
        streams: []
      }));
    }
  }, [stream, location.pathname]);

  const toggleFilterItem = (filterType: keyof Filters, item: string) => {
    setFilters(prevFilters => {
      // Handle minRating separately since it's a number, not an array
      if (filterType === "minRating") {
        return {
          ...prevFilters,
          [filterType]: Number(item)
        };
      }
      
      // For array filters, handle toggle logic
      const arrayFilter = prevFilters[filterType] as string[];
      if (arrayFilter.includes(item)) {
        return { 
          ...prevFilters, 
          [filterType]: arrayFilter.filter(i => i !== item)
        };
      } else {
        return { 
          ...prevFilters, 
          [filterType]: [...arrayFilter, item]
        };
      }
    });
  };

  const handleRatingChange = (value: number) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      minRating: value
    }));
  };

  const resetFilters = () => {
    setFilters({ streams: [], locations: [], collegeTypes: [], examsAccepted: [], minRating: 0 });
    setPriceRange([40000, 60000]);
    setPlacementRange([80, 100]);
  };

  if (isLoading) {
    return (
      <div className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-gray-900 mb-2">Loading colleges...</h3>
            <p className="text-gray-600">Please wait while we fetch the latest data</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-red-600 mb-2">Error loading colleges</h3>
            <p className="text-gray-600">Please try again later</p>
          </div>
        </div>
      </div>
    );
  }

  // Filter colleges and add ads
  const filteredColleges = filterColleges(collegeData, searchTerm, filters, priceRange, placementRange);
  const collegesWithAds = addAdsToColleges(filteredColleges);

  return (
    <div className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {stream ? `${stream.charAt(0).toUpperCase() + stream.slice(1).replace("-", " ")} Colleges` : "Colleges"}
          </h1>
          <p className="text-gray-600">
            Find and compare the best colleges to help you make an informed decision about your education.
          </p>
        </div>

        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  type="text"
                  placeholder="Search colleges by name or location"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className={`md:w-auto ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
                onClick={() => setViewMode("grid")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
              </Button>
              <Button 
                variant="outline" 
                className={`md:w-auto ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
                onClick={() => setViewMode("list")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
              </Button>
              <Button 
                variant="outline" 
                className="md:w-auto flex items-center gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={18} />
                <span>{showFilters ? "Hide Filters" : "Show Filters"}</span>
                <Badge className="ml-2 bg-education-600">
                  {filters.streams.length + filters.locations.length + filters.collegeTypes.length + filters.examsAccepted.length + (filters.minRating > 0 ? 1 : 0)}
                </Badge>
              </Button>
            </div>
          </div>
        </div>

        {showFilters && (
          <CollegeFilters 
            filters={filters}
            priceRange={priceRange}
            placementRange={placementRange}
            toggleFilterItem={toggleFilterItem}
            handleRatingChange={handleRatingChange}
            setPriceRange={setPriceRange}
            setPlacementRange={setPlacementRange}
            resetFilters={resetFilters}
          />
        )}

        <CollegeListView collegesWithAds={collegesWithAds} viewMode={viewMode} />
      </div>
    </div>
  );
};

export default CollegesList;
