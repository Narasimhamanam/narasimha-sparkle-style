import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Landing from "./pages/Landing";
import Shop from "./pages/Shop";
import DressDetail from "./pages/DressDetail";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddDress from "./pages/admin/AddDress";
import UserManagement from "./pages/admin/UserManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Navigation />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/dress/:id" element={<DressDetail />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/add-dress" element={<AddDress />} />
            <Route path="/admin/users" element={<UserManagement />} />
            
            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;