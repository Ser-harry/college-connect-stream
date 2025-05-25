
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star } from "lucide-react";
import { College } from "@/hooks/useColleges";

interface CollegeListItemProps {
  college: College;
}

const CollegeListItem = ({ college }: CollegeListItemProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden card-hover">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 h-40 md:h-auto">
          <img 
            src={college.image} 
            alt={college.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6 md:w-3/4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
            <div>
              <div className="flex items-center mb-2">
                <h3 className="font-bold text-xl">{college.name}</h3>
                <Badge className="ml-3 bg-education-600 flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  {college.rating}/5
                </Badge>
              </div>
              <p className="text-muted-foreground text-sm mb-1 flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                {college.location}
              </p>
            </div>
            <div className="mt-2 md:mt-0 flex flex-wrap gap-2">
              <Badge variant="outline" className="text-education-700 border-education-200 bg-education-50">
                {college.stream}
              </Badge>
              <Badge variant="outline" className="text-gray-600 border-gray-200 bg-gray-50">
                {college.college_type}
              </Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-4">
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
          
          <div className="mt-4 flex justify-between items-center border-t pt-4">
            <div className="text-sm">
              <span className="text-gray-600">Exams:</span> {college.exams_accepted.join(", ")}
            </div>
            <div className="flex gap-2">
              <Link to={`/colleges/detail/${college.id}`}>
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
  );
};

export default CollegeListItem;
