
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
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Featured Colleges</h2>
            <p className="mt-4 text-lg text-gray-600">Loading colleges...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Colleges</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Explore top-rated colleges across different streams to find the perfect match for your career aspirations.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {streams.map((stream) => (
            <Button
              key={stream}
              variant={activeStream === stream ? "default" : "outline"}
              onClick={() => setActiveStream(stream)}
              className="mb-2"
            >
              {stream}
            </Button>
          ))}
        </div>

        {/* Single column layout for colleges */}
        <div className="max-w-4xl mx-auto space-y-6">
          {filteredColleges.map((college) => (
            <Card key={college.id} className="overflow-hidden card-hover">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 h-48 md:h-auto">
                  <img 
                    src={college.image} 
                    alt={college.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="font-bold text-xl mr-3">{college.name}</h3>
                        <Badge className="bg-education-600 flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          {college.rating}/5
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm mb-2 flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {college.location}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="outline" className="text-education-700 border-education-200 bg-education-50">
                          {college.stream}
                        </Badge>
                        <Badge variant="outline" className="text-gray-600 border-gray-200 bg-gray-50">
                          {college.college_type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-600">Courses</div>
                      <div className="font-medium">{college.courses}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Fees</div>
                      <div className="font-medium">{college.fees}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Ranking</div>
                      <div className="font-medium">{college.ranking}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Placement</div>
                      <div className="font-medium">{college.placement_rate}%</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-sm text-gray-600">Exams:</span>
                    {college.exams_accepted.map((exam, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {exam}
                      </Badge>
                    ))}
                  </div>
                  
                  <CardFooter className="px-0 pb-0 pt-4 border-t flex justify-between">
                    <Link to={`/colleges/detail/${college.id}`}>
                      <Button variant="outline" size="sm">View Details</Button>
                    </Link>
                    <Link to="/counseling">
                      <Button size="sm">Get Counseling</Button>
                    </Link>
                  </CardFooter>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/colleges">
            <Button variant="outline" size="lg">
              View All Colleges
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedColleges;
