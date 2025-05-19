
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Sample data for popular courses
const courses = [
  {
    id: 1,
    name: "Computer Science Engineering",
    duration: "4 Years",
    level: "Bachelor's",
    colleges: 254,
    icon: "⚙️",
  },
  {
    id: 2,
    name: "Master of Business Administration",
    duration: "2 Years",
    level: "Master's",
    colleges: 325,
    icon: "📊",
  },
  {
    id: 3,
    name: "Medicine and Surgery (MBBS)",
    duration: "5 Years",
    level: "Bachelor's",
    colleges: 148,
    icon: "🩺",
  },
  {
    id: 4,
    name: "Bachelor of Architecture",
    duration: "5 Years",
    level: "Bachelor's",
    colleges: 87,
    icon: "🏛️",
  },
  {
    id: 5,
    name: "Bachelor of Pharmacy",
    duration: "4 Years",
    level: "Bachelor's",
    colleges: 192,
    icon: "💊",
  },
  {
    id: 6,
    name: "Electronics & Communication",
    duration: "4 Years",
    level: "Bachelor's",
    colleges: 216,
    icon: "📡",
  },
];

const PopularCourses = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Popular Courses</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the most sought-after courses that are defining educational trends and career opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="card-hover">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="bg-education-100 rounded-full p-3 text-2xl">
                    {course.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{course.name}</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="outline" className="text-education-700 border-education-200 bg-education-50">
                        {course.level}
                      </Badge>
                      <Badge variant="outline" className="text-education-700 border-education-200 bg-education-50">
                        {course.duration}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">Available in {course.colleges} colleges</p>
                    <div className="mt-4">
                      <Link to={`/courses/${course.id}`}>
                        <Button variant="outline" size="sm" className="mr-2">View Details</Button>
                      </Link>
                      <Link to={`/colleges?course=${course.id}`}>
                        <Button variant="link" size="sm" className="text-education-600">
                          Find Colleges
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/courses">
            <Button variant="outline" size="lg">
              Explore All Courses
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PopularCourses;
