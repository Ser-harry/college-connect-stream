
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Sample exams data
const exams = {
  engineering: [
    {
      id: 1,
      name: "JEE Advanced",
      date: "June 15, 2025",
      registrationDeadline: "March 30, 2025",
      examLevel: "National",
      eligibility: "Must qualify JEE Main",
      conductedBy: "IIT Delhi",
      description: "National level entrance exam for admission to various engineering colleges across India, particularly the Indian Institutes of Technology (IITs).",
      website: "https://jeeadv.ac.in",
    },
    {
      id: 2,
      name: "JEE Main",
      date: "April 8-12, 2025",
      registrationDeadline: "February 15, 2025",
      examLevel: "National",
      eligibility: "Class 12 with PCM",
      conductedBy: "NTA",
      description: "National level engineering entrance exam for admission to NITs, IIITs, and other centrally funded technical institutions.",
      website: "https://jeemain.nta.nic.in",
    },
    {
      id: 3,
      name: "BITSAT",
      date: "May 20, 2025",
      registrationDeadline: "April 15, 2025",
      examLevel: "National",
      eligibility: "Class 12 with PCM",
      conductedBy: "BITS Pilani",
      description: "Online entrance exam for admission to BITS campuses in Pilani, Goa, and Hyderabad.",
      website: "https://www.bitsadmission.com",
    },
  ],
  medical: [
    {
      id: 4,
      name: "NEET UG",
      date: "May 05, 2025",
      registrationDeadline: "February 28, 2025",
      examLevel: "National",
      eligibility: "Class 12 with PCB",
      conductedBy: "NTA",
      description: "National eligibility entrance test for admission to undergraduate medical courses in India.",
      website: "https://neet.nta.nic.in",
    },
    {
      id: 5,
      name: "AIIMS PG",
      date: "June 10, 2025",
      registrationDeadline: "April 20, 2025",
      examLevel: "National",
      eligibility: "MBBS Degree",
      conductedBy: "AIIMS",
      description: "Entrance exam for admission to postgraduate medical courses at AIIMS institutions across India.",
      website: "https://www.aiimsexams.ac.in",
    },
    {
      id: 6,
      name: "NEET PG",
      date: "March 15, 2025",
      registrationDeadline: "January 20, 2025",
      examLevel: "National",
      eligibility: "MBBS Degree",
      conductedBy: "NBE",
      description: "Entrance exam for admission to postgraduate medical courses in India.",
      website: "https://nbe.edu.in",
    },
  ],
  management: [
    {
      id: 7,
      name: "CAT",
      date: "November 28, 2025",
      registrationDeadline: "September 20, 2025",
      examLevel: "National",
      eligibility: "Graduation in any discipline",
      conductedBy: "IIM Bangalore",
      description: "Common Admission Test for admission to postgraduate management programs at IIMs and other top B-schools.",
      website: "https://iimcat.ac.in",
    },
    {
      id: 8,
      name: "XAT",
      date: "January 05, 2026",
      registrationDeadline: "November 30, 2025",
      examLevel: "National",
      eligibility: "Graduation in any discipline",
      conductedBy: "XLRI",
      description: "Xavier Aptitude Test for admission to management programs at XLRI and other associated institutions.",
      website: "https://xatonline.in",
    },
    {
      id: 9,
      name: "GMAT",
      date: "Year-round",
      registrationDeadline: "Variable",
      examLevel: "International",
      eligibility: "Graduation in any discipline",
      conductedBy: "GMAC",
      description: "Global standardized test for admission to business schools worldwide.",
      website: "https://www.mba.com/exams/gmat",
    },
  ],
};

const ExamsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("engineering");

  // Filter exams based on search term
  const filteredExams = exams[activeTab].filter(exam => 
    exam.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Entrance Exams</h1>
          <p className="text-gray-600">
            Stay updated with the latest information on entrance exams, important dates, and preparation resources.
          </p>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Search for exams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs defaultValue="engineering" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="engineering">Engineering</TabsTrigger>
            <TabsTrigger value="medical">Medical</TabsTrigger>
            <TabsTrigger value="management">Management</TabsTrigger>
          </TabsList>

          <TabsContent value="engineering" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredExams.map((exam) => (
                <ExamCard key={exam.id} exam={exam} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="medical" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredExams.map((exam) => (
                <ExamCard key={exam.id} exam={exam} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="management" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredExams.map((exam) => (
                <ExamCard key={exam.id} exam={exam} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {filteredExams.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No exams found</h3>
            <p className="text-gray-600">Try adjusting your search</p>
          </div>
        )}
      </div>
    </div>
  );
};

const ExamCard = ({ exam }) => {
  return (
    <Card className="card-hover">
      <CardContent className="pt-6">
        <div className="mb-2">
          <Badge variant="outline" className="text-education-700 border-education-200 bg-education-50">
            {exam.examLevel}
          </Badge>
        </div>
        <h3 className="font-bold text-lg mb-3">{exam.name}</h3>
        
        <div className="space-y-2 mb-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Exam Date</p>
            <p className="text-sm font-medium">{exam.date}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Registration Deadline</p>
            <p className="text-sm font-medium">{exam.registrationDeadline}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Conducted By</p>
            <p className="text-sm font-medium">{exam.conductedBy}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Eligibility</p>
            <p className="text-sm font-medium">{exam.eligibility}</p>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">{exam.description}</p>
        
        <div className="flex flex-wrap gap-2">
          <Link to={`/exams/${exam.id}`}>
            <Button variant="outline" size="sm" className="mr-2">View Details</Button>
          </Link>
          <Link to={`/exams/${exam.id}/prepare`}>
            <Button variant="link" size="sm" className="text-education-600">Preparation Tips</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExamsList;
