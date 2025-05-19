
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import CollegesList from "./pages/colleges/CollegesList";
import CollegeDetail from "./pages/colleges/CollegeDetail";
import CoursesList from "./pages/courses/CoursesList";
import ExamsList from "./pages/exams/ExamsList";
import Counseling from "./pages/counseling/Counseling";
import CompareColleges from "./pages/compare/CompareColleges";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="colleges" element={<CollegesList />} />
            <Route path="colleges/:id" element={<CollegeDetail />} />
            <Route path="colleges/:stream" element={<CollegesList />} />
            <Route path="courses" element={<CoursesList />} />
            <Route path="exams" element={<ExamsList />} />
            <Route path="counseling" element={<Counseling />} />
            <Route path="compare" element={<CompareColleges />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
