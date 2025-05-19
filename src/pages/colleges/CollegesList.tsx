
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, Filter, MapPin, Star } from "lucide-react";

// Sample colleges data
const collegeData = [
  {
    id: 1,
    name: "Stanford University",
    location: "Stanford, CA",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1186&q=80",
    rating: 4.9,
    stream: "Engineering",
    courses: 120,
    fees: "$56,000/year",
    feesNumeric: 56000,
    ranking: "#1 in Engineering",
    collegeType: "Private",
    examsAccepted: ["SAT", "ACT", "GRE"],
    placementRate: 98
  },
  {
    id: 2,
    name: "Harvard Business School",
    location: "Boston, MA",
    image: "https://images.unsplash.com/photo-1591429939960-b7d5add10b5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    rating: 4.8,
    stream: "Management",
    courses: 85,
    fees: "$58,000/year",
    feesNumeric: 58000,
    ranking: "#1 in Management",
    collegeType: "Private",
    examsAccepted: ["GMAT", "GRE"],
    placementRate: 96
  },
  {
    id: 3,
    name: "Johns Hopkins University",
    location: "Baltimore, MD",
    image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    rating: 4.7,
    stream: "Medical",
    courses: 95,
    fees: "$54,000/year",
    feesNumeric: 54000,
    ranking: "#1 in Medicine",
    collegeType: "Private",
    examsAccepted: ["MCAT", "GRE"],
    placementRate: 94
  },
  {
    id: 4,
    name: "Rhode Island School of Design",
    location: "Providence, RI",
    image: "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    rating: 4.6,
    stream: "Design",
    courses: 65,
    fees: "$51,000/year",
    feesNumeric: 51000,
    ranking: "#1 in Fine Arts",
    collegeType: "Private",
    examsAccepted: ["Portfolio Review"],
    placementRate: 91
  },
  {
    id: 5,
    name: "MIT",
    location: "Cambridge, MA",
    image: "https://images.unsplash.com/photo-1580931689600-ba5fc1de0720?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80",
    rating: 4.9,
    stream: "Engineering",
    courses: 130,
    fees: "$57,000/year",
    feesNumeric: 57000,
    ranking: "#2 in Engineering",
    collegeType: "Private",
    examsAccepted: ["SAT", "ACT", "GRE"],
    placementRate: 97
  },
  {
    id: 6,
    name: "Caltech",
    location: "Pasadena, CA",
    image: "https://images.unsplash.com/photo-1557332374-269c5d60a3eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    rating: 4.8,
    stream: "Engineering",
    courses: 110,
    fees: "$52,000/year",
    feesNumeric: 52000,
    ranking: "#3 in Engineering",
    collegeType: "Private",
    examsAccepted: ["SAT", "ACT", "GRE"],
    placementRate: 95
  },
  {
    id: 7,
    name: "University of California, Berkeley",
    location: "Berkeley, CA",
    image: "https://images.unsplash.com/photo-1569447891824-aafc226bf56f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    rating: 4.7,
    stream: "Arts & Science",
    courses: 150,
    fees: "$43,000/year",
    feesNumeric: 43000,
    ranking: "#4 in Arts & Science",
    collegeType: "Public",
    examsAccepted: ["SAT", "ACT"],
    placementRate: 92
  },
  {
    id: 8,
    name: "University of Michigan",
    location: "Ann Arbor, MI",
    image: "https://images.unsplash.com/photo-1605292356935-b08aaa12e59d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    rating: 4.6,
    stream: "Arts & Science",
    courses: 140,
    fees: "$49,000/year",
    feesNumeric: 49000,
    ranking: "#5 in Arts & Science",
    collegeType: "Public",
    examsAccepted: ["SAT", "ACT"],
    placementRate: 90
  },
];

const CollegesList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    streams: [],
    locations: [],
    collegeTypes: [],
    examsAccepted: [],
    minRating: 0
  });
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([40000, 60000]);
  const [placementRange, setPlacementRange] = useState([80, 100]);
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"

  // Available filter options
  const streamOptions = ["Engineering", "Medical", "Management", "Design", "Arts & Science"];
  const locationOptions = ["CA", "MA", "MD", "RI", "MI"];
  const collegeTypeOptions = ["Public", "Private"];
  const examOptions = ["SAT", "ACT", "GRE", "GMAT", "MCAT", "Portfolio Review"];

  // Filter the colleges based on search and filters
  const filteredColleges = collegeData.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          college.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStream = filters.streams.length === 0 || filters.streams.includes(college.stream);
    
    const matchesLocation = filters.locations.length === 0 || 
                            filters.locations.some(loc => college.location.includes(loc));
    
    // Extract just the number from fees string for comparison
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

  const toggleFilterItem = (filterType, item) => {
    setFilters(prevFilters => {
      if (prevFilters[filterType].includes(item)) {
        return { 
          ...prevFilters, 
          [filterType]: prevFilters[filterType].filter(i => i !== item)
        };
      } else {
        return { 
          ...prevFilters, 
          [filterType]: [...prevFilters[filterType], item]
        };
      }
    });
  };

  const handleRatingChange = (value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      minRating: value
    }));
  };

  // Show ads after every 5th college card
  const collegesWithAds = filteredColleges.reduce((acc, college, index) => {
    acc.push(college);
    if ((index + 1) % 5 === 0 && index < filteredColleges.length - 1) {
      acc.push({ isAd: true, id: `ad-${Math.floor(index / 5)}` });
    }
    return acc;
  }, []);

  return (
    <div className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Colleges</h1>
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
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Stream</h3>
                <div className="space-y-2">
                  {streamOptions.map((stream) => (
                    <div key={stream} className="flex items-center">
                      <Checkbox
                        id={`stream-${stream}`}
                        checked={filters.streams.includes(stream)}
                        onCheckedChange={() => toggleFilterItem('streams', stream)}
                      />
                      <label htmlFor={`stream-${stream}`} className="ml-2 text-sm text-gray-700">
                        {stream}
                      </label>
                    </div>
                  ))}
                </div>

                <h3 className="font-medium text-gray-900 mb-3 mt-6">College Type</h3>
                <div className="space-y-2">
                  {collegeTypeOptions.map((type) => (
                    <div key={type} className="flex items-center">
                      <Checkbox
                        id={`type-${type}`}
                        checked={filters.collegeTypes.includes(type)}
                        onCheckedChange={() => toggleFilterItem('collegeTypes', type)}
                      />
                      <label htmlFor={`type-${type}`} className="ml-2 text-sm text-gray-700">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-3">Location</h3>
                <div className="space-y-2">
                  {locationOptions.map((location) => (
                    <div key={location} className="flex items-center">
                      <Checkbox
                        id={`location-${location}`}
                        checked={filters.locations.includes(location)}
                        onCheckedChange={() => toggleFilterItem('locations', location)}
                      />
                      <label htmlFor={`location-${location}`} className="ml-2 text-sm text-gray-700">
                        {location}
                      </label>
                    </div>
                  ))}
                </div>

                <h3 className="font-medium text-gray-900 mb-3 mt-6">Exams Accepted</h3>
                <div className="space-y-2">
                  {examOptions.map((exam) => (
                    <div key={exam} className="flex items-center">
                      <Checkbox
                        id={`exam-${exam}`}
                        checked={filters.examsAccepted.includes(exam)}
                        onCheckedChange={() => toggleFilterItem('examsAccepted', exam)}
                      />
                      <label htmlFor={`exam-${exam}`} className="ml-2 text-sm text-gray-700">
                        {exam}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-3">
                  Annual Fee Range: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
                </h3>
                <Slider
                  value={priceRange}
                  min={40000}
                  max={60000}
                  step={1000}
                  onValueChange={setPriceRange}
                  className="my-6"
                />

                <h3 className="font-medium text-gray-900 mb-3 mt-6">
                  Placement Rate: {placementRange[0]}% - {placementRange[1]}%
                </h3>
                <Slider
                  value={placementRange}
                  min={80}
                  max={100}
                  step={1}
                  onValueChange={setPlacementRange}
                  className="my-6"
                />

                <h3 className="font-medium text-gray-900 mb-3 mt-6">
                  Minimum Rating: {filters.minRating.toFixed(1)}+
                </h3>
                <Slider
                  value={[filters.minRating]}
                  min={0}
                  max={5}
                  step={0.1}
                  onValueChange={([value]) => handleRatingChange(value)}
                  className="my-6"
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setFilters({ streams: [], locations: [], collegeTypes: [], examsAccepted: [], minRating: 0 });
                  setPriceRange([40000, 60000]);
                  setPlacementRange([80, 100]);
                }}
              >
                Clear Filters
              </Button>
              <Button>Apply Filters</Button>
            </div>
          </div>
        )}

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collegesWithAds.map((item) => (
              item.isAd ? (
                <div key={item.id} className="col-span-1 md:col-span-2 lg:col-span-3 p-4 bg-gray-100 rounded-lg text-center">
                  <div className="h-20 flex items-center justify-center">
                    <span className="text-gray-500">Advertisement</span>
                  </div>
                </div>
              ) : (
                <Card key={item.id} className="overflow-hidden card-hover">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-3 right-3 bg-education-600 flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      {item.rating}/5
                    </Badge>
                  </div>
                  <CardContent className="pt-6">
                    <div className="mb-2">
                      <Badge variant="outline" className="text-education-700 border-education-200 bg-education-50">
                        {item.stream}
                      </Badge>
                      <Badge variant="outline" className="ml-2 text-gray-600 border-gray-200 bg-gray-50">
                        {item.collegeType}
                      </Badge>
                    </div>
                    <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                    <p className="text-muted-foreground text-sm mb-2 flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {item.location}
                    </p>
                    
                    <div className="space-y-1 mt-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Courses</span>
                        <span className="text-sm font-medium">{item.courses}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Fees</span>
                        <span className="text-sm font-medium">{item.fees}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Ranking</span>
                        <span className="text-sm font-medium">{item.ranking}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Placement</span>
                        <span className="text-sm font-medium">{item.placementRate}%</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4 flex justify-between">
                    <Link to={`/colleges/${item.id}`}>
                      <Button variant="outline" size="sm">View Details</Button>
                    </Link>
                    <Link to="/counseling">
                      <Button size="sm">Get Counseling</Button>
                    </Link>
                  </CardFooter>
                </Card>
              )
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {collegesWithAds.map((item) => (
              item.isAd ? (
                <div key={item.id} className="p-4 bg-gray-100 rounded-lg text-center">
                  <div className="h-20 flex items-center justify-center">
                    <span className="text-gray-500">Advertisement</span>
                  </div>
                </div>
              ) : (
                <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden card-hover">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/4 h-40 md:h-auto">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 md:w-3/4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                        <div>
                          <div className="flex items-center mb-2">
                            <h3 className="font-bold text-xl">{item.name}</h3>
                            <Badge className="ml-3 bg-education-600 flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              {item.rating}/5
                            </Badge>
                          </div>
                          <p className="text-muted-foreground text-sm mb-1 flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {item.location}
                          </p>
                        </div>
                        <div className="mt-2 md:mt-0 flex flex-wrap gap-2">
                          <Badge variant="outline" className="text-education-700 border-education-200 bg-education-50">
                            {item.stream}
                          </Badge>
                          <Badge variant="outline" className="text-gray-600 border-gray-200 bg-gray-50">
                            {item.collegeType}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-4">
                        <div>
                          <div className="text-sm text-gray-600">Courses</div>
                          <div className="font-medium">{item.courses}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Fees</div>
                          <div className="font-medium">{item.fees}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Ranking</div>
                          <div className="font-medium">{item.ranking}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Placement</div>
                          <div className="font-medium">{item.placementRate}%</div>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex justify-between items-center border-t pt-4">
                        <div className="text-sm">
                          <span className="text-gray-600">Exams:</span> {item.examsAccepted.join(", ")}
                        </div>
                        <div className="flex gap-2">
                          <Link to={`/colleges/${item.id}`}>
                            <Button variant="outline" size="sm">View Details</Button>
                          </Link>
                          <Link to="/counseling">
                            <Button size="sm">Get Counseling</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        )}

        {filteredColleges.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No colleges found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegesList;
