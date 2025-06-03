
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star } from "lucide-react";
import { useColleges } from "@/hooks/useColleges";

const FeaturedColleges = () => {
  const [activeStream, setActiveStream] = useState("All");
  const { data: colleges = [], isLoading } = useColleges();
  
  const streams = ["All", "Engineering", "Medical", "Management", "Design", "Arts & Science"];
  
  const filteredColleges = activeStream === "All" 
    ? colleges.slice(0, 4) // Show only first 4 colleges
    : colleges.filter(college => college.stream === activeStream).slice(0, 4);

  if (isLoading) {
    return (
      <div className="py-8 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Featured Colleges</h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600">Loading colleges...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Featured Colleges</h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Explore top-rated colleges across different streams to find the perfect match for your career aspirations.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-6 sm:mb-8">
          {streams.map((stream) => (
            <Button
              key={stream}
              variant={activeStream === stream ? "default" : "outline"}
              onClick={() => setActiveStream(stream)}
              className="mb-2 text-xs sm:text-sm px-2 sm:px-4"
              size="sm"
            >
              {stream}
            </Button>
          ))}
        </div>

        {/* Responsive college cards */}
        <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
          {filteredColleges.map((college) => (
            <Card key={college.id} className="overflow-hidden card-hover">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/3 h-48 md:h-auto">
                  <img 
                    src={college.image} 
                    alt={college.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full md:w-2/3 p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center mb-2">
                        <h3 className="font-bold text-lg sm:text-xl mr-0 sm:mr-3 mb-2 sm:mb-0 text-clamp-2">{college.name}</h3>
                        <Badge className="bg-education-600 flex items-center gap-1 w-fit">
                          <Star className="w-3 h-3" />
                          {college.rating}/5
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm mb-2 flex items-center text-clamp-1">
                        <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                        {college.location}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="outline" className="text-education-700 border-education-200 bg-education-50 text-xs">
                          {college.stream}
                        </Badge>
                        <Badge variant="outline" className="text-gray-600 border-gray-200 bg-gray-50 text-xs">
                          {college.college_type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4">
                    <div>
                      <div className="text-xs sm:text-sm text-gray-600">Courses</div>
                      <div className="font-medium text-sm sm:text-base">{college.courses}</div>
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm text-gray-600">Fees</div>
                      <div className="font-medium text-sm sm:text-base text-clamp-1">{college.fees}</div>
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm text-gray-600">Ranking</div>
                      <div className="font-medium text-sm sm:text-base text-clamp-1">{college.ranking}</div>
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm text-gray-600">Placement</div>
                      <div className="font-medium text-sm sm:text-base">{college.placement_rate}%</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs sm:text-sm text-gray-600">Exams:</span>
                    {college.exams_accepted.map((exam, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {exam}
                      </Badge>
                    ))}
                  </div>
                  
                  <CardFooter className="px-0 pb-0 pt-4 border-t flex flex-col sm:flex-row justify-between gap-2">
                    <Link to={`/colleges/detail/${college.id}`} className="w-full sm:w-auto">
                      <Button variant="outline" size="sm" className="w-full sm:w-auto">View Details</Button>
                    </Link>
                    <Link to="/counseling" className="w-full sm:w-auto">
                      <Button size="sm" className="w-full sm:w-auto">Get Counseling</Button>
                    </Link>
                  </CardFooter>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 sm:mt-12 text-center">
          <Link to="/colleges">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              View All Colleges
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedColleges;
