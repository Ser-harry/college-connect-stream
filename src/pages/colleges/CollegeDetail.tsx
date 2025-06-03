
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MapPin, Globe, Calendar, Users, Award, TrendingUp } from "lucide-react";
import { useColleges } from "@/hooks/useColleges";
import { useCutoffs } from "@/hooks/useCutoffs";
import { useCourses } from "@/hooks/useCourses";

const CollegeDetail = () => {
  const { id } = useParams();
  const collegeId = parseInt(id || '0');
  
  const { data: colleges = [] } = useColleges();
  const { data: cutoffs = [] } = useCutoffs(collegeId);
  const { data: courses = [] } = useCourses();

  const college = colleges.find(c => c.id === collegeId);
  const collegeCourses = courses.filter(course => course.college_id === collegeId);

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

  // Group cutoffs by category and branch for better display
  const cutoffsByCategory = cutoffs.reduce((acc, cutoff) => {
    if (!acc[cutoff.category]) {
      acc[cutoff.category] = [];
    }
    acc[cutoff.category].push(cutoff);
    return acc;
  }, {} as Record<string, typeof cutoffs>);

  // Get unique branches
  const branches = [...new Set(cutoffs.map(c => c.branch))];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div 
        className="h-72 lg:h-96 bg-cover bg-center relative" 
        style={{ backgroundImage: `url(${college.image || 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="container mx-auto px-4 h-full flex items-end">
          <div className="relative pb-6 text-white">
            <div className="flex items-center">
              <div className="w-16 h-16 mr-4 bg-white rounded-lg overflow-hidden flex-shrink-0">
                <img 
                  src={college.image || 'https://via.placeholder.com/64'} 
                  alt={`${college.name} logo`} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{college.name}</h1>
                <p className="mt-1">{college.college_type} College</p>
                <div className="flex items-center mt-2">
                  <Badge className="bg-education-600">
                    {college.rating}/5
                  </Badge>
                  <span className="mx-2">•</span>
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {college.location}
                  </span>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-education-600" />
                <div>
                  <p className="font-medium">Stream</p>
                  <p className="text-gray-600">{college.stream}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-education-600" />
                <div>
                  <p className="font-medium">Total Courses</p>
                  <p className="text-gray-600">{college.courses}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-education-600" />
                <div>
                  <p className="font-medium">Placement Rate</p>
                  <p className="text-gray-600">{college.placement_rate}%</p>
                </div>
              </div>
              <div>
                <p className="font-medium">Fees</p>
                <p className="text-gray-600">{college.fees}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="font-medium">Exams Accepted</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {college.exams_accepted?.map((exam, index) => (
                    <Badge key={index} variant="secondary">{exam}</Badge>
                  ))}
                </div>
              </div>
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

        <Tabs defaultValue="cutoffs" className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="cutoffs">Cutoffs</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="facilities">Facilities</TabsTrigger>
            <TabsTrigger value="admissions">Admissions</TabsTrigger>
          </TabsList>

          <TabsContent value="cutoffs" className="bg-white rounded-lg shadow-sm p-6 mt-2">
            <h2 className="text-xl font-bold mb-4">TNEA Cutoff Marks 2024</h2>
            {Object.keys(cutoffsByCategory).length === 0 ? (
              <p className="text-gray-600">No cutoff data available for this college.</p>
            ) : (
              <div className="space-y-6">
                {Object.entries(cutoffsByCategory).map(([category, categoryCutoffs]) => (
                  <div key={category}>
                    <h3 className="text-lg font-semibold mb-3">{category} Category</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Branch</TableHead>
                          <TableHead>Cutoff Mark</TableHead>
                          <TableHead>Year</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {categoryCutoffs.map((cutoff) => (
                          <TableRow key={cutoff.id}>
                            <TableCell className="font-medium">{cutoff.branch}</TableCell>
                            <TableCell>{cutoff.cutoff_mark}</TableCell>
                            <TableCell>{cutoff.year}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="courses" className="bg-white rounded-lg shadow-sm p-6 mt-2">
            <h2 className="text-xl font-bold mb-4">Courses Offered</h2>
            {collegeCourses.length === 0 ? (
              <p className="text-gray-600">No course data available for this college.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {collegeCourses.map((course) => (
                  <Card key={course.id} className="card-hover">
                    <CardContent className="pt-6">
                      <h3 className="font-bold text-lg mb-1">{course.course_name}</h3>
                      <div className="text-sm text-gray-500 mb-3">
                        Duration: {course.duration}
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        <strong>Fees:</strong> ₹{course.fees_per_year.toLocaleString()}/year
                      </div>
                      {course.seats_available && (
                        <div className="text-sm text-gray-600 mb-2">
                          <strong>Seats:</strong> {course.seats_available}
                        </div>
                      )}
                      {course.eligibility && (
                        <div className="text-sm text-gray-600">
                          <strong>Eligibility:</strong> {course.eligibility}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="facilities" className="bg-white rounded-lg shadow-sm p-6 mt-2">
            <h2 className="text-xl font-bold mb-4">Campus Facilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium">Library</h3>
                <p className="text-sm text-gray-600 mt-1">Well-equipped library with extensive collection</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium">Labs</h3>
                <p className="text-sm text-gray-600 mt-1">Modern laboratories for practical learning</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium">Sports Complex</h3>
                <p className="text-sm text-gray-600 mt-1">Sports facilities for student recreation</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium">Hostels</h3>
                <p className="text-sm text-gray-600 mt-1">Comfortable accommodation for students</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium">Cafeteria</h3>
                <p className="text-sm text-gray-600 mt-1">Hygienic food services</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium">Medical Center</h3>
                <p className="text-sm text-gray-600 mt-1">On-campus healthcare facilities</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="admissions" className="bg-white rounded-lg shadow-sm p-6 mt-2">
            <h2 className="text-xl font-bold mb-4">Admission Process</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Eligibility Criteria</h3>
                <p className="text-gray-700">
                  Candidates must have completed their 12th standard with Physics, Chemistry, and Mathematics 
                  with a minimum of 50% marks (45% for reserved categories).
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Application Process</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Register for TNEA counseling</li>
                  <li>Fill the online application form</li>
                  <li>Upload required documents</li>
                  <li>Pay the application fee</li>
                  <li>Attend counseling as per schedule</li>
                </ol>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Required Documents</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>10th and 12th mark sheets</li>
                  <li>Transfer certificate</li>
                  <li>Community certificate (if applicable)</li>
                  <li>Income certificate (if applicable)</li>
                  <li>Nativity certificate</li>
                </ul>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-6">
              <Link to="/counseling">
                <Button>Get Admission Counseling</Button>
              </Link>
              <Button variant="outline">Download Brochure</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CollegeDetail;
