
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CounselingSection = () => {
  const counselingOptions = [
    {
      title: "College Selection",
      description: "Get personalized college recommendations based on your academic profile and career goals.",
      icon: "🎓",
    },
    {
      title: "Career Guidance",
      description: "Understand various career paths and make informed decisions about your professional future.",
      icon: "🧭",
    },
    {
      title: "Admission Assistance",
      description: "Receive step-by-step guidance through the admission process for your target institutions.",
      icon: "📝",
    },
    {
      title: "Financial Aid",
      description: "Explore scholarships, grants, and other financial assistance options available to you.",
      icon: "💰",
    },
  ];

  return (
    <div className="py-8 sm:py-16 bg-education-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Get Expert Educational Counseling</h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600">
              Our experienced counselors are ready to help you navigate your educational journey with personalized guidance.
            </p>
            
            <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-4 sm:gap-6">
              {counselingOptions.map((option, index) => (
                <div key={index} className="bg-white p-4 sm:p-6 rounded-lg shadow-sm flex">
                  <div className="mr-3 sm:mr-4 text-xl sm:text-2xl flex-shrink-0">{option.icon}</div>
                  <div className="min-w-0">
                    <h3 className="font-medium text-gray-900 text-sm sm:text-base">{option.title}</h3>
                    <p className="mt-2 text-xs sm:text-sm text-gray-500 text-clamp-3">{option.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 sm:mt-8">
              <Link to="/counseling">
                <Button size="lg" className="w-full sm:w-auto">Schedule Counseling Session</Button>
              </Link>
            </div>
          </div>
          
          <div className="order-first lg:order-last lg:flex lg:justify-end">
            <img 
              src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
              alt="Students getting counseling"
              className="rounded-lg shadow-lg max-h-64 sm:max-h-96 object-cover w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounselingSection;
