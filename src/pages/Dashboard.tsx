
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";

// This is a router component that redirects to the appropriate dashboard based on user role
export default function Dashboard() {
  const navigate = useNavigate();
  
  // Mock authentication check - in a real app, this would use Supabase auth
  const isLoggedIn = true; // Simulate logged in state for demo
  const userRole = "user"; // One of: "admin", "vendor", "user"

  useEffect(() => {
    // If not logged in, redirect to login
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    
    // Short timeout to simulate checking user role
    const timer = setTimeout(() => {
      // Fix the type comparison by using a more specific type for userRole
      switch (userRole) {
        case "admin":
          navigate("/admin");
          break;
        case "vendor":
          navigate("/vendor");
          break;
        case "user":
          navigate("/user");
          break;
        default:
          // If role is not recognized, default to user dashboard
          navigate("/user");
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [navigate, isLoggedIn, userRole]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Loader className="h-8 w-8 animate-spin text-carwash-primary" />
      <p className="mt-4 text-gray-600">Redirecting to your dashboard...</p>
    </div>
  );
}
