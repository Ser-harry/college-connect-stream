
import { useState } from "react";
import { Button } from "@/components/ui/button";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    if (email) {
      setIsSubmitted(true);
      setEmail("");
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }
  };

  return (
    <div className="py-16 bg-education-600">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white">Stay Updated</h2>
          <p className="mt-4 text-lg text-education-100">
            Subscribe to our newsletter for the latest updates on colleges, courses, exams, and educational insights.
          </p>

          <form onSubmit={handleSubmit} className="mt-8">
            <div className="sm:flex sm:items-center sm:justify-center">
              <div className="min-w-0 flex-1">
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  id="email"
                  type="email"
                  className="block w-full rounded-md border-0 py-3 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-education-600"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <Button type="submit" className="w-full bg-white text-education-600 hover:bg-gray-100">
                  Subscribe
                </Button>
              </div>
            </div>
            {isSubmitted && (
              <p className="mt-3 text-sm text-education-100">
                Thank you for subscribing! We'll send you updates soon.
              </p>
            )}
            <p className="mt-3 text-xs text-education-200">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSection;
