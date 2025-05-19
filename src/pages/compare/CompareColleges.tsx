
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { X } from "lucide-react";

// Sample college data for comparison
const collegesData = [
  {
    id: 1,
    name: "Stanford University",
    location: "Stanford, CA",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Stanford_Cardinal_logo.svg/1200px-Stanford_Cardinal_logo.svg.png",
    established: "1885",
    type: "Private",
    accreditation: "WASC Senior College and University Commission",
    ranking: "#1 in Engineering",
    fees: {
      tuition: "$56,000/year",
      total: "$75,200/year"
    },
    studentsEnrolled: 17000,
    acceptanceRate: "4.3%",
    courses: 120,
    placement: {
      placementRate: "98%",
      avgSalary: "$130,000"
    },
    facultyRatio: "5:1",
    infrastructure: {
      library: 5,
      labs: 5,
      sports: 5,
      hostel: 4
    }
  },
  {
    id: 2,
    name: "Harvard University",
    location: "Cambridge, MA",
    logo: "https://1000logos.net/wp-content/uploads/2017/02/Harvard-Logo.png",
    established: "1636",
    type: "Private",
    accreditation: "New England Commission of Higher Education",
    ranking: "#1 in Law",
    fees: {
      tuition: "$54,000/year",
      total: "$73,800/year"
    },
    studentsEnrolled: 23000,
    acceptanceRate: "4.6%",
    courses: 135,
    placement: {
      placementRate: "96%",
      avgSalary: "$125,000"
    },
    facultyRatio: "6:1",
    infrastructure: {
      library: 5,
      labs: 4,
      sports: 5,
      hostel: 5
    }
  },
  {
    id: 3,
    name: "MIT",
    location: "Cambridge, MA",
    logo: "https://1000logos.net/wp-content/uploads/2022/08/MIT-Logo.png",
    established: "1861",
    type: "Private",
    accreditation: "New England Commission of Higher Education",
    ranking: "#1 in Computer Science",
    fees: {
      tuition: "$57,000/year",
      total: "$77,500/year"
    },
    studentsEnrolled: 11000,
    acceptanceRate: "4.1%",
    courses: 110,
    placement: {
      placementRate: "97%",
      avgSalary: "$132,000"
    },
    facultyRatio: "3:1",
    infrastructure: {
      library: 5,
      labs: 5,
      sports: 4,
      hostel: 4
    }
  },
  {
    id: 4,
    name: "Caltech",
    location: "Pasadena, CA",
    logo: "https://identity.caltech.edu/assets/site/img/caltech-block.png",
    established: "1891",
    type: "Private",
    accreditation: "WASC Senior College and University Commission",
    ranking: "#2 in Physical Sciences",
    fees: {
      tuition: "$58,000/year",
      total: "$79,000/year"
    },
    studentsEnrolled: 2200,
    acceptanceRate: "6.4%",
    courses: 90,
    placement: {
      placementRate: "95%",
      avgSalary: "$128,000"
    },
    facultyRatio: "3:1",
    infrastructure: {
      library: 4,
      labs: 5,
      sports: 3,
      hostel: 4
    }
  },
  {
    id: 5,
    name: "Princeton University",
    location: "Princeton, NJ",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Princeton_shield.svg/1200px-Princeton_shield.svg.png",
    established: "1746",
    type: "Private",
    accreditation: "Middle States Commission on Higher Education",
    ranking: "#1 in Mathematics",
    fees: {
      tuition: "$55,000/year",
      total: "$74,500/year"
    },
    studentsEnrolled: 8000,
    acceptanceRate: "5.5%",
    courses: 105,
    placement: {
      placementRate: "94%",
      avgSalary: "$122,000"
    },
    facultyRatio: "4:1",
    infrastructure: {
      library: 5,
      labs: 4,
      sports: 4,
      hostel: 5
    }
  },
];

const CompareColleges = () => {
  const [selectedColleges, setSelectedColleges] = useState([1, 2, 3]); // Default selected colleges
  
  const addCollege = (collegeId) => {
    if (selectedColleges.length < 3 && !selectedColleges.includes(collegeId)) {
      setSelectedColleges([...selectedColleges, collegeId]);
    }
  };

  const removeCollege = (collegeId) => {
    setSelectedColleges(selectedColleges.filter(id => id !== collegeId));
  };

  const getSelectedCollegesData = () => {
    return collegesData.filter(college => selectedColleges.includes(college.id));
  };

  // Available colleges for dropdown (excluding already selected ones)
  const availableColleges = collegesData.filter(college => !selectedColleges.includes(college.id));

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`w-4 h-4 ${i < rating ? 'bg-education-500' : 'bg-gray-200'} rounded-full mx-0.5`}></div>
        ))}
      </div>
    );
  };

  return (
    <div className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Compare Colleges</h1>
          <p className="text-gray-600">
            Compare colleges side by side to make an informed decision about your education.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-medium mb-4">Select Colleges to Compare</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {selectedColleges.map((collegeId, index) => {
              const college = collegesData.find(c => c.id === collegeId);
              return (
                <div key={index} className="bg-gray-50 rounded-lg p-4 relative">
                  {college ? (
                    <div>
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-white rounded-lg overflow-hidden flex-shrink-0 mr-3">
                          <img 
                            src={college.logo} 
                            alt={`${college.name} logo`} 
                            className="w-full h-full object-contain p-1"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{college.name}</h3>
                          <p className="text-sm text-gray-500">{college.location}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeCollege(college.id)}
                        className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200"
                        aria-label="Remove college"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div>
                      {availableColleges.length > 0 ? (
                        <Select onValueChange={(value) => addCollege(parseInt(value))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Add a college..." />
                          </SelectTrigger>
                          <SelectContent>
                            {availableColleges.map(college => (
                              <SelectItem key={college.id} value={college.id.toString()}>
                                {college.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="text-center py-4 text-gray-500">
                          No more colleges available
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          <div>
            <Button 
              variant="outline" 
              onClick={() => {
                if (selectedColleges.length < 3 && availableColleges.length > 0) {
                  addCollege(availableColleges[0].id);
                }
              }}
              disabled={selectedColleges.length >= 3 || availableColleges.length === 0}
            >
              {selectedColleges.length >= 3 ? 'Maximum 3 colleges' : 'Add College'}
            </Button>
          </div>
        </div>

        {selectedColleges.length > 0 && (
          <div className="mb-8">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-40">Comparison Criteria</TableHead>
                    {getSelectedCollegesData().map(college => (
                      <TableHead key={college.id}>{college.name}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Established</TableCell>
                    {getSelectedCollegesData().map(college => (
                      <TableCell key={college.id}>{college.established}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Type</TableCell>
                    {getSelectedCollegesData().map(college => (
                      <TableCell key={college.id}>{college.type}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Accreditation</TableCell>
                    {getSelectedCollegesData().map(college => (
                      <TableCell key={college.id}>{college.accreditation}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Ranking</TableCell>
                    {getSelectedCollegesData().map(college => (
                      <TableCell key={college.id}>
                        <Badge className="bg-education-600">{college.ranking}</Badge>
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Annual Fees</TableCell>
                    {getSelectedCollegesData().map(college => (
                      <TableCell key={college.id}>{college.fees.total}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Students Enrolled</TableCell>
                    {getSelectedCollegesData().map(college => (
                      <TableCell key={college.id}>{college.studentsEnrolled.toLocaleString()}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Acceptance Rate</TableCell>
                    {getSelectedCollegesData().map(college => (
                      <TableCell key={college.id}>{college.acceptanceRate}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Courses Offered</TableCell>
                    {getSelectedCollegesData().map(college => (
                      <TableCell key={college.id}>{college.courses}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Placement Rate</TableCell>
                    {getSelectedCollegesData().map(college => (
                      <TableCell key={college.id}>
                        <div className="flex items-center gap-2">
                          <Progress value={parseInt(college.placement.placementRate)} className="h-2 w-24" />
                          <span>{college.placement.placementRate}</span>
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Average Salary</TableCell>
                    {getSelectedCollegesData().map(college => (
                      <TableCell key={college.id}>{college.placement.avgSalary}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Faculty Ratio</TableCell>
                    {getSelectedCollegesData().map(college => (
                      <TableCell key={college.id}>{college.facultyRatio}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Library Facilities</TableCell>
                    {getSelectedCollegesData().map(college => (
                      <TableCell key={college.id}>
                        {renderStars(college.infrastructure.library)}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Laboratory Facilities</TableCell>
                    {getSelectedCollegesData().map(college => (
                      <TableCell key={college.id}>
                        {renderStars(college.infrastructure.labs)}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Sports Facilities</TableCell>
                    {getSelectedCollegesData().map(college => (
                      <TableCell key={college.id}>
                        {renderStars(college.infrastructure.sports)}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Hostel Facilities</TableCell>
                    {getSelectedCollegesData().map(college => (
                      <TableCell key={college.id}>
                        {renderStars(college.infrastructure.hostel)}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        <div className="text-center mt-12">
          <h2 className="text-xl font-bold mb-4">Need Help Deciding?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our counselors can help you analyze these comparisons and choose the best fit for your educational goals and career aspirations.
          </p>
          <Button>Schedule a Counseling Session</Button>
        </div>
      </div>
    </div>
  );
};

export default CompareColleges;
