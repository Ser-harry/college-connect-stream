
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data for upcoming exams
const exams = {
  engineering: [
    {
      id: 1,
      name: "JEE Advanced",
      date: "June 15, 2025",
      registrationDeadline: "March 30, 2025",
      level: "National",
    },
    {
      id: 2,
      name: "BITSAT",
      date: "May 20, 2025",
      registrationDeadline: "April 15, 2025",
      level: "National",
    },
    {
      id: 3,
      name: "VITEEE",
      date: "April 12-18, 2025",
      registrationDeadline: "March 25, 2025",
      level: "University",
    },
  ],
  medical: [
    {
      id: 4,
      name: "NEET UG",
      date: "May 05, 2025",
      registrationDeadline: "February 28, 2025",
      level: "National",
    },
    {
      id: 5,
      name: "AIIMS PG",
      date: "June 10, 2025",
      registrationDeadline: "April 20, 2025",
      level: "National",
    },
  ],
  management: [
    {
      id: 6,
      name: "CAT",
      date: "November 28, 2025",
      registrationDeadline: "September 20, 2025",
      level: "National",
    },
    {
      id: 7,
      name: "MAT",
      date: "December 05, 2025",
      registrationDeadline: "November 15, 2025",
      level: "National",
    },
    {
      id: 8,
      name: "XAT",
      date: "January 05, 2026",
      registrationDeadline: "November 30, 2025",
      level: "National",
    },
  ],
};

const UpcomingExams = () => {
  const [activeTab, setActiveTab] = useState("engineering");

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Upcoming Exams</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest examination schedules, registration deadlines, and preparation resources.
          </p>
        </div>

        <div className="mb-8">
          <Tabs defaultValue="engineering" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-center">
              <TabsList>
                <TabsTrigger value="engineering">Engineering</TabsTrigger>
                <TabsTrigger value="medical">Medical</TabsTrigger>
                <TabsTrigger value="management">Management</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="engineering" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {exams.engineering.map((exam) => (
                  <ExamCard key={exam.id} exam={exam} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="medical" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {exams.medical.map((exam) => (
                  <ExamCard key={exam.id} exam={exam} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="management" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {exams.management.map((exam) => (
                  <ExamCard key={exam.id} exam={exam} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-12 text-center">
          <Link to="/exams">
            <Button variant="outline" size="lg">
              View All Exams
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const ExamCard = ({ exam }) => (
  <Card className="card-hover">
    <CardContent className="pt-6">
      <div className="mb-2">
        <Badge variant="outline" className="text-education-700 border-education-200 bg-education-50">
          {exam.level}
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
      </div>
      
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

export default UpcomingExams;
