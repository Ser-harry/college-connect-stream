
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star } from "lucide-react";
import { College } from "@/data/collegeData";

interface CollegeCardProps {
  college: College;
}

const CollegeCard = ({ college }: CollegeCardProps) => {
  return (
    <Card className="overflow-hidden card-hover flex flex-col">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={college.image} 
          alt={college.name} 
          className="w-full h-full object-cover"
        />
        <Badge className="absolute top-3 right-3 bg-education-600 flex items-center gap-1">
          <Star className="w-3 h-3" />
          {college.rating}/5
        </Badge>
      </div>
      <CardContent className="pt-6 flex-grow">
        <div className="mb-2">
          <Badge variant="outline" className="text-education-700 border-education-200 bg-education-50">
            {college.stream}
          </Badge>
          <Badge variant="outline" className="ml-2 text-gray-600 border-gray-200 bg-gray-50">
            {college.collegeType}
          </Badge>
        </div>
        <h3 className="font-bold text-lg mb-1">{college.name}</h3>
        <p className="text-muted-foreground text-sm mb-2 flex items-center">
          <MapPin className="w-3 h-3 mr-1" />
          {college.location}
        </p>
        
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
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Placement</span>
            <span className="text-sm font-medium">{college.placementRate}%</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between mt-auto">
        <Link to={`/colleges/${college.id}`}>
          <Button variant="outline" size="sm">View Details</Button>
        </Link>
        <Link to="/counseling">
          <Button size="sm">Get Counseling</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CollegeCard;
