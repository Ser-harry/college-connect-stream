
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/auth/AuthProvider";
import ProfileCompletionPrompt from "@/components/auth/ProfileCompletionPrompt";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import CollegesList from "./pages/colleges/CollegesList";
import CollegeDetail from "./pages/colleges/CollegeDetail";
import CoursesList from "./pages/courses/CoursesList";
import ExamsList from "./pages/exams/ExamsList";
import Counseling from "./pages/counseling/Counseling";
import CompareColleges from "./pages/compare/CompareColleges";
import AuthPage from "./pages/auth/AuthPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ProfileCompletionPrompt />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="colleges">
                <Route index element={<CollegesList />} />
                <Route path=":stream" element={<CollegesList />} />
                <Route path="detail/:id" element={<CollegeDetail />} />
              </Route>
              <Route path="courses" element={<CoursesList />} />
              <Route path="exams" element={<ExamsList />} />
              <Route path="counseling" element={<Counseling />} />
              <Route path="compare" element={<CompareColleges />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
