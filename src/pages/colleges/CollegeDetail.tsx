
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";

// Sample college data, in a real app this would come from an API
const collegeDetails = {
  1: {
    id: 1,
    name: "Stanford University",
    tagline: "The Leland Stanford Junior University",
    description: "Stanford University, officially Leland Stanford Junior University, is a private research university in Stanford, California. The campus occupies 8,180 acres, among the largest in the United States, and enrolls over 17,000 students.",
    coverImage: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1186&q=80",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Stanford_Cardinal_logo.svg/1200px-Stanford_Cardinal_logo.svg.png",
    location: "Stanford, CA",
    established: "1885",
    type: "Private",
    accreditation: "WASC Senior College and University Commission",
    campusSize: "8,180 acres",
    ranking: "#1 in Engineering",
    website: "https://www.stanford.edu",
    rating: 4.9,
    stream: "Engineering",
    courses: [
      { id: 1, name: "Computer Science", duration: "4 years", degree: "B.S." },
      { id: 2, name: "Electrical Engineering", duration: "4 years", degree: "B.S." },
      { id: 3, name: "Mechanical Engineering", duration: "4 years", degree: "B.S." },
      { id: 4, name: "Civil Engineering", duration: "4 years", degree: "B.S." },
      { id: 5, name: "Chemical Engineering", duration: "4 years", degree: "B.S." },
    ],
    fees: {
      tuition: "$56,000/year",
      housing: "$18,000/year",
      books: "$1,200/year",
      total: "$75,200/year"
    },
    facilities: ["Library", "Sports Complex", "Research Labs", "Student Housing", "Cafeteria", "Medical Center"],
    placements: {
      averageSalary: "$130,000",
      topRecruiters: ["Google", "Apple", "Microsoft", "Amazon", "Facebook"],
      placementRate: "98%"
    },
    faculty: {
      count: 2,240,
      studentFacultyRatio: "5:1",
      withPhD: "97%"
    },
    reviews: [
      { id: 1, user: "Sarah K.", rating: 5, comment: "Excellent academic environment and research opportunities." },
      { id: 2, user: "Michael T.", rating: 4, comment: "Great faculty but the cost of living in the area is very high." },
      { id: 3, user: "Jessica L.", rating: 5, comment: "The networking opportunities here are unmatched. I got an internship at a top tech company." },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
      "https://images.unsplash.com/photo-1592494804071-faea15d93a8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    ],
    admissionProcess: "The admission process includes submitting academic transcripts, standardized test scores (SAT/ACT), letters of recommendation, and personal essays. Applications are typically due in early January for the fall semester.",
  },
  // Additional colleges would be defined here
};

const CollegeDetail = () => {
  const { id } = useParams();
  const collegeId = parseInt(id);
  const college = collegeDetails[collegeId];

  if (!college) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold">College Not Found</h1>
        <p className="mt-4 text-gray-600">
          The college you are looking for does not exist or has been removed.
        </p>
        <Link to="/colleges">
          <Button className="mt-6">Back to Colleges</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div 
        className="h-72 lg:h-96 bg-cover bg-center relative" 
        style={{ backgroundImage: `url(${college.coverImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="container mx-auto px-4 h-full flex items-end">
          <div className="relative pb-6 text-white">
            <div className="flex items-center">
              <div className="w-16 h-16 mr-4 bg-white rounded-lg overflow-hidden flex-shrink-0">
                <img 
                  src={college.logo} 
                  alt={`${college.name} logo`} 
                  className="w-full h-full object-contain p-2"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{college.name}</h1>
                <p className="mt-1">{college.tagline}</p>
                <div className="flex items-center mt-2">
                  <Badge className="bg-education-600">
                    {college.rating}/5
                  </Badge>
                  <span className="mx-2">•</span>
                  <span>{college.location}</span>
                  <span className="mx-2">•</span>
                  <span>{college.ranking}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <p className="text-gray-700 leading-relaxed">
            {college.description}
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex gap-2">
              <span className="font-medium text-gray-700">Established:</span>
              <span>{college.established}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-medium text-gray-700">Type:</span>
              <span>{college.type}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-medium text-gray-700">Accreditation:</span>
              <span>{college.accreditation}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-medium text-gray-700">Campus Size:</span>
              <span>{college.campusSize}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-medium text-gray-700">Website:</span>
              <a href={college.website} target="_blank" rel="noopener noreferrer" className="text-education-600 hover:underline">
                Visit Website
              </a>
            </div>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap gap-4">
          <Link to="/counseling">
            <Button size="lg" className="flex-grow">Get Counseling</Button>
          </Link>
          <Link to={`/compare?college=${college.id}`}>
            <Button variant="outline" size="lg" className="flex-grow">Add to Compare</Button>
          </Link>
        </div>

        <Tabs defaultValue="courses" className="mb-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="fees">Fees</TabsTrigger>
            <TabsTrigger value="facilities">Facilities</TabsTrigger>
            <TabsTrigger value="placements">Placements</TabsTrigger>
            <TabsTrigger value="faculty">Faculty</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="bg-white rounded-lg shadow-sm p-6 mt-2">
            <h2 className="text-xl font-bold mb-4">Courses Offered</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {college.courses.map((course) => (
                <Card key={course.id} className="card-hover">
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg mb-1">{course.name}</h3>
                    <div className="text-sm text-gray-500 mb-3">
                      {course.degree} • {course.duration}
                    </div>
                    <div className="mt-2">
                      <Link to={`/courses/${course.id}`}>
                        <Button variant="link" className="p-0 h-auto text-education-600">
                          View Course Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="fees" className="bg-white rounded-lg shadow-sm p-6 mt-2">
            <h2 className="text-xl font-bold mb-4">Fees & Expenses</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-medium">Tuition</span>
                <span>{college.fees.tuition}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-medium">Housing & Dining</span>
                <span>{college.fees.housing}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-medium">Books & Supplies</span>
                <span>{college.fees.books}</span>
              </div>
              <div className="flex justify-between items-center pt-2 font-bold">
                <span>Total Estimated Cost</span>
                <span>{college.fees.total}</span>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-bold mb-2">Financial Aid</h3>
              <p className="text-gray-700">
                Stanford offers comprehensive financial aid packages based on demonstrated need. 
                Around 70% of students receive some form of financial assistance, and the university 
                is committed to meeting 100% of demonstrated financial need for all admitted students.
              </p>
              <Button variant="outline" className="mt-4">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Check Financial Aid Options
                </a>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="facilities" className="bg-white rounded-lg shadow-sm p-6 mt-2">
            <h2 className="text-xl font-bold mb-4">Campus Facilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {college.facilities.map((facility, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium">{facility}</h3>
                </div>
              ))}
            </div>

            <h3 className="font-bold mt-8 mb-4">Campus Gallery</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {college.gallery.map((image, index) => (
                <div key={index} className="aspect-video rounded-lg overflow-hidden">
                  <img 
                    src={image} 
                    alt={`${college.name} campus ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="placements" className="bg-white rounded-lg shadow-sm p-6 mt-2">
            <h2 className="text-xl font-bold mb-4">Placements & Career Outcomes</h2>
            
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <span className="font-medium w-48">Placement Rate:</span>
                <div className="flex-1 flex items-center gap-2">
                  <Progress value={parseInt(college.placements.placementRate)} className="h-2 flex-1" />
                  <span className="font-medium">{college.placements.placementRate}</span>
                </div>
              </div>
              <div className="flex items-center">
                <span className="font-medium w-48">Average Salary:</span>
                <span>{college.placements.averageSalary}</span>
              </div>
            </div>

            <h3 className="font-bold mt-8 mb-2">Top Recruiters</h3>
            <div className="flex flex-wrap gap-2">
              {college.placements.topRecruiters.map((company, index) => (
                <Badge key={index} variant="secondary">{company}</Badge>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="font-bold mb-2">Career Services</h3>
              <p className="text-gray-700">
                Stanford provides comprehensive career services including career coaching, resume reviews, 
                mock interviews, networking events, and career fairs. The Career Development Center 
                offers personalized guidance to help students explore career options and find jobs 
                and internships aligned with their goals.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="faculty" className="bg-white rounded-lg shadow-sm p-6 mt-2">
            <h2 className="text-xl font-bold mb-4">Faculty & Academics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-education-700 mb-2">{college.faculty.count}</div>
                <div className="text-gray-600">Total Faculty Members</div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-education-700 mb-2">{college.faculty.studentFacultyRatio}</div>
                <div className="text-gray-600">Student-Faculty Ratio</div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-education-700 mb-2">{college.faculty.withPhD}</div>
                <div className="text-gray-600">Faculty with PhD</div>
              </div>
            </div>
            
            <h3 className="font-bold mt-8 mb-2">Research & Excellence</h3>
            <p className="text-gray-700 mb-6">
              Stanford is renowned for its cutting-edge research across disciplines. The university has 
              numerous research centers and institutes, and faculty members include Nobel laureates, 
              members of the National Academy of Sciences, and other distinguished scholars. Students have 
              abundant opportunities to participate in groundbreaking research projects.
            </p>

            <h3 className="font-bold mt-8 mb-2">Student Reviews</h3>
            <div className="space-y-4">
              {college.reviews.map((review) => (
                <div key={review.id} className="border-b pb-4">
                  <div className="flex justify-between">
                    <span className="font-medium">{review.user}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < review.rating ? "text-yellow-500" : "text-gray-300"}>★</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 mt-1">{review.comment}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Admission Process</h2>
          <p className="text-gray-700 mb-6">{college.admissionProcess}</p>
          
          <div className="flex flex-wrap gap-4">
            <Link to="/counseling">
              <Button>Get Admission Counseling</Button>
            </Link>
            <Button variant="outline">Download Brochure</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeDetail;
