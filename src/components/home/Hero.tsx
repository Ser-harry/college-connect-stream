
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Calculator } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-br from-education-600 via-education-700 to-education-800 text-white">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')"
        }}
      />
      <div className="absolute inset-0 bg-black/60"></div>
      
      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6">
            Find Your Perfect College
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8 text-education-100">
            Discover thousands of colleges, compare programs, and make informed decisions about your future
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input 
                type="text" 
                placeholder="Search colleges, courses, or locations..."
                className="pl-10 py-3 text-gray-900 w-full"
              />
            </div>
            <Link to="/colleges" className="w-full md:w-auto">
              <Button size="lg" variant="secondary" className="w-full md:w-auto">
                Search Colleges
              </Button>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/predictor" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-education-700 flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm"
              >
                <Calculator size={20} />
                TNEA Predictor
              </Button>
            </Link>
            <Link to="/counseling" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-education-700 bg-white/10 backdrop-blur-sm"
              >
                Get Counseling
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
