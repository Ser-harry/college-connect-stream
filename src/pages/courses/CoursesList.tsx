
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Sample courses data
const courses = {
  undergraduate: [
    {
      id: 1,
      name: "Computer Science Engineering",
      duration: "4 Years",
      degree: "B.S./B.Tech",
      colleges: 254,
      icon: "⚙️",
      description: "Study the principles of computer systems, programming languages, algorithms, and computer architecture.",
    },
    {
      id: 2,
      name: "Mechanical Engineering",
      duration: "4 Years",
      degree: "B.S./B.Tech",
      colleges: 312,
      icon: "🔧",
      description: "Learn about designing, manufacturing, and maintaining mechanical systems and machines.",
    },
    {
      id: 3,
      name: "Bachelor of Medicine and Surgery",
      duration: "5 Years",
      degree: "MBBS",
      colleges: 148,
      icon: "🩺",
      description: "Comprehensive medical education covering anatomy, physiology, pathology, and clinical practice.",
    },
    {
      id: 4,
      name: "Bachelor of Architecture",
      duration: "5 Years",
      degree: "B.Arch",
      colleges: 87,
      icon: "🏛️",
      description: "Learn architectural design, history, theory, and professional practice.",
    },
    {
      id: 5,
      name: "Bachelor of Pharmacy",
      duration: "4 Years",
      degree: "B.Pharm",
      colleges: 192,
      icon: "💊",
      description: "Study pharmaceutical sciences, drug formulation, and pharmacology.",
    },
    {
      id: 6,
      name: "Bachelor of Business Administration",
      duration: "3 Years",
      degree: "BBA",
      colleges: 347,
      icon: "📊",
      description: "Learn business fundamentals, management principles, and organizational behavior.",
    },
  ],
  postgraduate: [
    {
      id: 7,
      name: "Master of Business Administration",
      duration: "2 Years",
      degree: "MBA",
      colleges: 325,
      icon: "📈",
      description: "Advanced business education covering management, marketing, finance, and entrepreneurship.",
    },
    {
      id: 8,
      name: "Master of Computer Applications",
      duration: "2 Years",
      degree: "MCA",
      colleges: 186,
      icon: "💻",
      description: "Advanced study of computer applications, software development, and IT management.",
    },
    {
      id: 9,
      name: "Master of Science in Data Science",
      duration: "2 Years",
      degree: "M.S.",
      colleges: 95,
      icon: "📊",
      description: "Learn advanced data analytics, machine learning, and statistical modeling.",
    },
    {
      id: 10,
      name: "Master of Public Health",
      duration: "2 Years",
      degree: "MPH",
      colleges: 62,
      icon: "🏥",
      description: "Study epidemiology, biostatistics, health policy, and community health.",
    },
  ],
  diploma: [
    {
      id: 11,
      name: "Diploma in Civil Engineering",
      duration: "3 Years",
      degree: "Diploma",
      colleges: 178,
      icon: "🏗️",
      description: "Practical education in civil engineering fundamentals and construction technology.",
    },
    {
      id: 12,
      name: "Diploma in Hotel Management",
      duration: "3 Years",
      degree: "Diploma",
      colleges: 143,
      icon: "🏨",
      description: "Learn hospitality operations, food service, and hotel administration.",
    },
  ],
};

const CoursesList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("undergraduate");

  // Filter courses based on search term
  const filteredCourses = courses[activeTab].filter(course => 
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Courses</h1>
          <p className="text-gray-600">
            Explore a wide range of courses across different streams and find the right educational path for your career goals.
          </p>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Search for courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs defaultValue="undergraduate" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="undergraduate">Undergraduate</TabsTrigger>
            <TabsTrigger value="postgraduate">Postgraduate</TabsTrigger>
            <TabsTrigger value="diploma">Diploma</TabsTrigger>
          </TabsList>

          <TabsContent value="undergraduate" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="postgraduate" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="diploma" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {filteredCourses.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600">Try adjusting your search</p>
          </div>
        )}
      </div>
    </div>
  );
};

const CourseCard = ({ course }) => {
  return (
    <Card className="card-hover">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className="bg-education-100 rounded-full p-3 text-2xl">
            {course.icon}
          </div>
          <div>
            <h3 className="font-bold text-lg mb-1">{course.name}</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="outline" className="text-education-700 border-education-200 bg-education-50">
                {course.degree}
              </Badge>
              <Badge variant="outline" className="text-education-700 border-education-200 bg-education-50">
                {course.duration}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mb-3">{course.description}</p>
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
  );
};

export default CoursesList;
