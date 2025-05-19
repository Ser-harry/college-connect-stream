
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, Filter } from "lucide-react";

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
    ranking: "#1 in Engineering",
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
    ranking: "#1 in Management",
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
    ranking: "#1 in Medicine",
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
    ranking: "#1 in Fine Arts",
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
    ranking: "#2 in Engineering",
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
    ranking: "#3 in Engineering",
  },
];

const CollegesList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    streams: [],
    locations: [],
  });
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([40000, 60000]);

  // Available filter options
  const streamOptions = ["Engineering", "Medical", "Management", "Design", "Arts & Science"];
  const locationOptions = ["CA", "MA", "MD", "RI"];

  // Filter the colleges based on search and filters
  const filteredColleges = collegeData.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          college.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStream = filters.streams.length === 0 || filters.streams.includes(college.stream);
    
    const matchesLocation = filters.locations.length === 0 || 
                            filters.locations.some(loc => college.location.includes(loc));
    
    // Extract just the number from fees string for comparison
    const collegeFees = parseInt(college.fees.replace(/[^0-9]/g, ''));
    const matchesPriceRange = collegeFees >= priceRange[0] && collegeFees <= priceRange[1];
    
    return matchesSearch && matchesStream && matchesLocation && matchesPriceRange;
  });

  const toggleStreamFilter = (stream) => {
    setFilters(prevFilters => {
      if (prevFilters.streams.includes(stream)) {
        return { 
          ...prevFilters, 
          streams: prevFilters.streams.filter(s => s !== stream)
        };
      } else {
        return { 
          ...prevFilters, 
          streams: [...prevFilters.streams, stream]
        };
      }
    });
  };

  const toggleLocationFilter = (location) => {
    setFilters(prevFilters => {
      if (prevFilters.locations.includes(location)) {
        return { 
          ...prevFilters, 
          locations: prevFilters.locations.filter(l => l !== location)
        };
      } else {
        return { 
          ...prevFilters, 
          locations: [...prevFilters.locations, location]
        };
      }
    });
  };

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
            <Button 
              variant="outline" 
              className="md:w-auto flex items-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} />
              <span>{showFilters ? "Hide Filters" : "Show Filters"}</span>
              <Badge className="ml-2 bg-education-600">{filters.streams.length + filters.locations.length}</Badge>
            </Button>
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
                        onCheckedChange={() => toggleStreamFilter(stream)}
                      />
                      <label htmlFor={`stream-${stream}`} className="ml-2 text-sm text-gray-700">
                        {stream}
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
                        onCheckedChange={() => toggleLocationFilter(location)}
                      />
                      <label htmlFor={`location-${location}`} className="ml-2 text-sm text-gray-700">
                        {location}
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
              </div>
            </div>
            
            <div className="mt-6 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setFilters({ streams: [], locations: [] });
                  setPriceRange([40000, 60000]);
                }}
              >
                Clear Filters
              </Button>
              <Button>Apply Filters</Button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredColleges.map((college) => (
            <Card key={college.id} className="overflow-hidden card-hover">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={college.image} 
                  alt={college.name} 
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-3 right-3 bg-education-600">
                  {college.rating}/5
                </Badge>
              </div>
              <CardContent className="pt-6">
                <div className="mb-2">
                  <Badge variant="outline" className="text-education-700 border-education-200 bg-education-50">
                    {college.stream}
                  </Badge>
                </div>
                <h3 className="font-bold text-lg mb-1">{college.name}</h3>
                <p className="text-muted-foreground text-sm mb-2">{college.location}</p>
                
                <div className="space-y-1 mt-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Courses</span>
                    <span className="text-sm font-medium">{college.courses}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Fees</span>
                    <span className="text-sm font-medium">{college.fees}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Ranking</span>
                    <span className="text-sm font-medium">{college.ranking}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-between">
                <Link to={`/colleges/${college.id}`}>
                  <Button variant="outline" size="sm">View Details</Button>
                </Link>
                <Link to="/counseling">
                  <Button size="sm">Get Counseling</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

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
