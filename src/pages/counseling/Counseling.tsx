
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CounselingPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    counselingType: "college-selection",
    stream: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRadioChange = (value) => {
    setFormData({
      ...formData,
      counselingType: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormSubmitted(true);
  };

  const counselingServices = [
    {
      title: "One-on-One Counseling",
      description: "Personal guidance sessions with experienced counselors to address your specific educational needs.",
      features: ["Personalized career roadmap", "College shortlisting", "Admission guidance", "30-60 minute sessions"],
      price: "$50",
    },
    {
      title: "Career Assessment",
      description: "Comprehensive assessment to identify your strengths, interests, and suitable career paths.",
      features: ["Aptitude testing", "Interest inventory", "Personality assessment", "Detailed report & recommendations"],
      price: "$35",
    },
    {
      title: "Admission Assistance",
      description: "End-to-end support throughout the college application and admission process.",
      features: ["Application review", "Essay guidance", "Interview preparation", "Scholarship assistance"],
      price: "$75",
    },
  ];

  return (
    <div className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Educational Counseling</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our experienced counselors provide personalized guidance to help you navigate your educational journey 
            and make informed decisions about your future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {counselingServices.map((service, index) => (
            <Card key={index} className="card-hover">
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <svg className="h-5 w-5 text-education-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div className="font-bold text-lg">{service.price}</div>
                <Button variant="outline">Learn More</Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Request Counseling Session</CardTitle>
              <CardDescription>
                Fill out the form below to schedule a counseling session with our experts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {formSubmitted ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                    <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Thank You!</h3>
                  <p className="text-gray-600 mb-4">
                    Your counseling request has been submitted successfully. One of our counselors will contact you 
                    within 24 hours to schedule your session.
                  </p>
                  <Button onClick={() => setFormSubmitted(false)}>Submit Another Request</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label>Counseling Type</Label>
                    <RadioGroup 
                      defaultValue="college-selection" 
                      value={formData.counselingType}
                      onValueChange={handleRadioChange}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                      <div className="flex items-center space-x-2 border rounded-md p-3">
                        <RadioGroupItem value="college-selection" id="college-selection" />
                        <Label htmlFor="college-selection">College Selection</Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-md p-3">
                        <RadioGroupItem value="career-guidance" id="career-guidance" />
                        <Label htmlFor="career-guidance">Career Guidance</Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-md p-3">
                        <RadioGroupItem value="admission-assistance" id="admission-assistance" />
                        <Label htmlFor="admission-assistance">Admission Assistance</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="stream">Stream of Interest</Label>
                    <Select 
                      value={formData.stream} 
                      onValueChange={(value) => handleSelectChange("stream", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a stream" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="medical">Medical</SelectItem>
                        <SelectItem value="management">Management</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="arts-science">Arts & Science</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Additional Information</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us more about your educational background and goals..."
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">Submit Request</Button>
                </form>
              )}
            </CardContent>
          </Card>

          <div className="mt-12 text-center">
            <h2 className="text-xl font-bold mb-4">Have Questions?</h2>
            <p className="text-gray-600 mb-6">
              Contact our support team for any questions about our counseling services.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Us
              </Button>
              <Button variant="outline">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Us
              </Button>
              <Button variant="outline">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Live Chat
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounselingPage;
