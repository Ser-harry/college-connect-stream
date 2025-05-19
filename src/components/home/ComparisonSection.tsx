
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ComparisonSection = () => {
  const features = [
    {
      title: "Side-by-Side Comparison",
      description: "Compare up to 3 colleges simultaneously on key parameters like courses, fees, rankings, and placements.",
    },
    {
      title: "Detailed Metrics",
      description: "Evaluate colleges based on infrastructure, faculty quality, research output, and student satisfaction.",
    },
    {
      title: "ROI Calculator",
      description: "Understand the return on investment for different colleges based on placement statistics and fee structures.",
    },
  ];

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Compare Colleges</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Make data-driven decisions by comparing colleges on multiple parameters to find your perfect match.
          </p>
        </div>

        <div className="bg-education-600 rounded-xl overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0.5 bg-white/10">
            <div className="bg-white p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-education-700">Stanford University</h3>
                <p className="text-gray-500 text-sm mt-1">Stanford, CA</p>
                <div className="mt-4">
                  <div className="flex justify-between py-2">
                    <span className="text-sm text-gray-600">Average Fees</span>
                    <span className="font-medium">$56,000/year</span>
                  </div>
                  <div className="flex justify-between py-2 border-t">
                    <span className="text-sm text-gray-600">NIRF Ranking</span>
                    <span className="font-medium">#1</span>
                  </div>
                  <div className="flex justify-between py-2 border-t">
                    <span className="text-sm text-gray-600">Placement Rate</span>
                    <span className="font-medium">98%</span>
                  </div>
                  <div className="flex justify-between py-2 border-t">
                    <span className="text-sm text-gray-600">Avg. Package</span>
                    <span className="font-medium">$130,000</span>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Button variant="outline" className="w-full">View Details</Button>
              </div>
            </div>
            
            <div className="bg-white p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-education-700">MIT</h3>
                <p className="text-gray-500 text-sm mt-1">Cambridge, MA</p>
                <div className="mt-4">
                  <div className="flex justify-between py-2">
                    <span className="text-sm text-gray-600">Average Fees</span>
                    <span className="font-medium">$58,000/year</span>
                  </div>
                  <div className="flex justify-between py-2 border-t">
                    <span className="text-sm text-gray-600">NIRF Ranking</span>
                    <span className="font-medium">#2</span>
                  </div>
                  <div className="flex justify-between py-2 border-t">
                    <span className="text-sm text-gray-600">Placement Rate</span>
                    <span className="font-medium">97%</span>
                  </div>
                  <div className="flex justify-between py-2 border-t">
                    <span className="text-sm text-gray-600">Avg. Package</span>
                    <span className="font-medium">$128,000</span>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Button variant="outline" className="w-full">View Details</Button>
              </div>
            </div>
            
            <div className="bg-white p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-education-700">Caltech</h3>
                <p className="text-gray-500 text-sm mt-1">Pasadena, CA</p>
                <div className="mt-4">
                  <div className="flex justify-between py-2">
                    <span className="text-sm text-gray-600">Average Fees</span>
                    <span className="font-medium">$52,000/year</span>
                  </div>
                  <div className="flex justify-between py-2 border-t">
                    <span className="text-sm text-gray-600">NIRF Ranking</span>
                    <span className="font-medium">#3</span>
                  </div>
                  <div className="flex justify-between py-2 border-t">
                    <span className="text-sm text-gray-600">Placement Rate</span>
                    <span className="font-medium">96%</span>
                  </div>
                  <div className="flex justify-between py-2 border-t">
                    <span className="text-sm text-gray-600">Avg. Package</span>
                    <span className="font-medium">$125,000</span>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Button variant="outline" className="w-full">View Details</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="p-6 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link to="/compare">
            <Button size="lg">
              Use College Comparison Tool
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ComparisonSection;
