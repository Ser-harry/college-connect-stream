
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Sample testimonials data
const testimonials = [
  {
    id: 1,
    name: "Sophia Johnson",
    college: "Stanford University",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
    quote: "KollegeHub's counseling services helped me narrow down my choices and apply to colleges that were the perfect fit for my career aspirations. I'm now studying at my dream university!",
  },
  {
    id: 2,
    name: "David Williams",
    college: "Harvard Business School",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    quote: "The college comparison tool was invaluable in helping me make an informed decision. I could clearly see the differences in program offerings, faculty expertise, and career outcomes.",
  },
  {
    id: 3,
    name: "Priya Sharma",
    college: "Johns Hopkins University",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    quote: "The exam information and preparation resources were comprehensive and up-to-date. I was well-prepared for my medical entrance exams and secured admission to a top medical school.",
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : testimonials.length - 1));
  };
  
  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex < testimonials.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <div className="py-16 bg-education-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Student Success Stories</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from students who found their ideal educational path with our guidance.
          </p>
        </div>

        <div className="flex justify-center">
          <Card className="bg-white shadow-lg max-w-3xl">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-64 md:h-auto">
                  <img 
                    src={testimonials[activeIndex].image} 
                    alt={testimonials[activeIndex].name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <div className="text-4xl text-education-600 mb-4">"</div>
                    <p className="text-gray-600 italic mb-6">
                      {testimonials[activeIndex].quote}
                    </p>
                  </div>
                  <div>
                    <p className="font-bold">{testimonials[activeIndex].name}</p>
                    <p className="text-gray-500 text-sm">{testimonials[activeIndex].college}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 flex justify-center space-x-4">
          <button 
            onClick={prevTestimonial}
            className="p-2 rounded-full bg-white shadow hover:bg-gray-100 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <div className="flex space-x-2 items-center">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${index === activeIndex ? 'bg-education-600' : 'bg-gray-300'}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          <button 
            onClick={nextTestimonial}
            className="p-2 rounded-full bg-white shadow hover:bg-gray-100 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
