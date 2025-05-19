
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-education-50">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32 bg-education-50">
          <div className="pt-10 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
            <div className="mx-auto max-w-7xl lg:px-8">
              <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
                  <div className="lg:py-24">
                    <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-gray-900 sm:mt-5 sm:text-5xl lg:mt-6 xl:text-6xl">
                      <span className="block">Find Your Perfect</span>
                      <span className="block text-education-600">Educational Path</span>
                    </h1>
                    <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                      Discover and compare colleges, courses, and exams to make informed decisions about your education journey.
                    </p>
                    <div className="mt-8 sm:mt-12">
                      <form className="sm:max-w-xl sm:mx-auto lg:mx-0">
                        <div className="sm:flex">
                          <div className="flex-1 min-w-0">
                            <label htmlFor="search" className="sr-only">Search</label>
                            <input
                              id="search"
                              type="text"
                              placeholder="Search for colleges, courses or exams"
                              className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:ring-education-500 focus:border-education-500 sm:text-sm"
                            />
                          </div>
                          <div className="mt-3 sm:mt-0 sm:ml-3">
                            <button
                              type="submit"
                              className="block w-full px-4 py-3 rounded-md border border-transparent bg-education-600 text-white shadow-sm hover:bg-education-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-education-500 sm:text-sm"
                            >
                              <Search className="h-4 w-4 inline-block mr-2" />
                              Search
                            </button>
                          </div>
                        </div>
                      </form>
                      <div className="mt-6">
                        <div className="inline-flex items-center divide-x divide-gray-300">
                          <div className="flex-1 flex justify-center lg:justify-start">
                            <Link to="/colleges" className="text-sm font-medium text-education-600 hover:text-education-500">
                              Browse Colleges <span aria-hidden="true">&rarr;</span>
                            </Link>
                          </div>
                          <div className="flex-1 flex justify-center px-5">
                            <Link to="/exams" className="text-sm font-medium text-education-600 hover:text-education-500">
                              View Exams <span aria-hidden="true">&rarr;</span>
                            </Link>
                          </div>
                          <div className="flex-1 flex justify-center lg:justify-end">
                            <Link to="/counseling" className="text-sm font-medium text-education-600 hover:text-education-500">
                              Get Counseling <span aria-hidden="true">&rarr;</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
                  <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                    <img
                      className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                      src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                      alt="Students on campus"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
