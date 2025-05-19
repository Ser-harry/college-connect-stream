
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isStreamMenuOpen, setIsStreamMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (isStreamMenuOpen) setIsStreamMenuOpen(false);
  };
  
  const toggleStreamMenu = () => {
    setIsStreamMenuOpen(!isStreamMenuOpen);
  };

  const streamOptions = [
    { name: "Engineering", path: "/colleges/engineering" },
    { name: "Management", path: "/colleges/management" },
    { name: "Medical", path: "/colleges/medical" },
    { name: "Design", path: "/colleges/design" },
    { name: "Arts & Science", path: "/colleges/arts-science" },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-education-700">Kollege<span className="text-education-500">Hub</span></span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/colleges" className="nav-link">Colleges</Link>
            
            <div className="relative">
              <button 
                onClick={toggleStreamMenu}
                className="nav-link flex items-center"
              >
                Streams <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {isStreamMenuOpen && (
                <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 animate-fade-in">
                  <div className="py-1">
                    {streamOptions.map((stream) => (
                      <Link
                        key={stream.name}
                        to={stream.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-education-50"
                        onClick={() => setIsStreamMenuOpen(false)}
                      >
                        {stream.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <Link to="/courses" className="nav-link">Courses</Link>
            <Link to="/exams" className="nav-link">Exams</Link>
            <Link to="/counseling" className="nav-link">Counseling</Link>
            <Link to="/compare" className="nav-link">Compare</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <Button variant="outline">Log In</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="mobile-menu-button p-2 rounded-md hover:bg-education-100 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-2 pb-4 animate-fade-in">
            <Link to="/colleges" className="block py-2 text-education-800 hover:bg-education-50 px-4 rounded">
              Colleges
            </Link>
            
            <div>
              <button 
                onClick={toggleStreamMenu}
                className="w-full text-left py-2 text-education-800 hover:bg-education-50 px-4 rounded flex justify-between items-center"
              >
                <span>Streams</span> 
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {isStreamMenuOpen && (
                <div className="pl-4">
                  {streamOptions.map((stream) => (
                    <Link
                      key={stream.name}
                      to={stream.path}
                      className="block py-2 text-gray-600 hover:bg-education-50 px-4 rounded"
                      onClick={toggleMenu}
                    >
                      {stream.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            <Link to="/courses" className="block py-2 text-education-800 hover:bg-education-50 px-4 rounded">
              Courses
            </Link>
            <Link to="/exams" className="block py-2 text-education-800 hover:bg-education-50 px-4 rounded">
              Exams
            </Link>
            <Link to="/counseling" className="block py-2 text-education-800 hover:bg-education-50 px-4 rounded">
              Counseling
            </Link>
            <Link to="/compare" className="block py-2 text-education-800 hover:bg-education-50 px-4 rounded">
              Compare
            </Link>
            <div className="mt-4 space-y-2 px-4">
              <Link to="/login" className="block">
                <Button variant="outline" className="w-full">Log In</Button>
              </Link>
              <Link to="/signup" className="block">
                <Button className="w-full">Sign Up</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
