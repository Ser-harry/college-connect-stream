
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Sample data for featured colleges
const colleges = [
  {
    id: 1,
    name: "Stanford University",
    location: "Stanford, CA",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1186&q=80",
    rating: 4.9,
    stream: "Engineering",
    courses: 120,
  },
  {
    id: 2,
    name: "Harvard Business School",
    location: "Boston, MA",
    image: "https://images.unsplash.com/photo-1591429939960-b7d5add10b5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    rating: 4.8,
    stream: "Management",
    courses: 85,
  },
  {
    id: 3,
    name: "Johns Hopkins University",
    location: "Baltimore, MD",
    image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    rating: 4.7,
    stream: "Medical",
    courses: 95,
  },
  {
    id: 4,
    name: "Rhode Island School of Design",
    location: "Providence, RI",
    image: "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    rating: 4.6,
    stream: "Design",
    courses: 65,
  },
];

const FeaturedColleges = () => {
  const [activeStream, setActiveStream] = useState("All");
  const streams = ["All", "Engineering", "Medical", "Management", "Design", "Arts & Science"];
  
  const filteredColleges = activeStream === "All" 
    ? colleges 
    : colleges.filter(college => college.stream === activeStream);

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <p className="text-sm text-gray-600">{college.courses} courses available</p>
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
