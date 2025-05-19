
import Hero from "@/components/home/Hero";
import FeaturedColleges from "@/components/home/FeaturedColleges";
import PopularCourses from "@/components/home/PopularCourses";
import UpcomingExams from "@/components/home/UpcomingExams";
import CounselingSection from "@/components/home/CounselingSection";
import ComparisonSection from "@/components/home/ComparisonSection";
import Testimonials from "@/components/home/Testimonials";
import NewsletterSection from "@/components/home/NewsletterSection";

const Index = () => {
  return (
    <div>
      <Hero />
      <FeaturedColleges />
      <PopularCourses />
      <UpcomingExams />
      <CounselingSection />
      <ComparisonSection />
      <Testimonials />
      <NewsletterSection />
    </div>
  );
};

export default Index;
