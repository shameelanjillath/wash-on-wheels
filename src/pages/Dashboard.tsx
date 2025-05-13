
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";

// Define a type for the role
type UserRole = "admin" | "vendor" | "user";

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [userRole, setUserRole] = useState<UserRole>("user");

  useEffect(() => {
    // In a real app, you'd check authentication and get user role
    // For demo purposes, let's assume the user is authenticated
    // and has a specific role (admin, vendor, or user)
    const checkAuth = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));
        // Mock authentication result
        setIsAuthenticated(true);
        // Set user role (could be from API or local storage)
        setUserRole("vendor"); // Change this to simulate different roles
      } catch (error) {
        console.error("Authentication error:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (userRole === "admin") {
    return <Navigate to="/admin" />;
  }

  if (userRole === "vendor") {
    return <Navigate to="/vendor" />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-1 container mx-auto p-4 md:p-6">
        <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Dashboard content goes here */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
