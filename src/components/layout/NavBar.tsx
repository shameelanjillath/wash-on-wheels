
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, MapPin, CarFront, User } from "lucide-react";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  // Mock authentication state - in real app, this would use Supabase auth
  const isLoggedIn = false;
  const userRole = null; // would be 'admin', 'vendor', or 'user'

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo and brand */}
          <Link to="/" className="flex items-center space-x-2">
            <CarFront className="h-6 w-6 text-carwash-primary" />
            <span className="text-xl font-display font-semibold text-carwash-dark">
              SplashWash
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/vendors" 
              className="text-gray-600 hover:text-carwash-primary transition-colors"
            >
              Find Locations
            </Link>
            <Link 
              to="/booking" 
              className="text-gray-600 hover:text-carwash-primary transition-colors"
            >
              Book Now
            </Link>
            {isLoggedIn ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-gray-600 hover:text-carwash-primary transition-colors"
                >
                  Dashboard
                </Link>
                <Button variant="outline">Log Out</Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline">Log In</Button>
                </Link>
                <Link to="/register">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="p-2 text-gray-600 hover:text-carwash-primary transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/vendors" 
                className="px-2 py-2 text-gray-600 hover:text-carwash-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center space-x-2">
                  <MapPin size={18} />
                  <span>Find Locations</span>
                </div>
              </Link>
              <Link 
                to="/booking" 
                className="px-2 py-2 text-gray-600 hover:text-carwash-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center space-x-2">
                  <CarFront size={18} />
                  <span>Book Now</span>
                </div>
              </Link>
              {isLoggedIn ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="px-2 py-2 text-gray-600 hover:text-carwash-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center space-x-2">
                      <User size={18} />
                      <span>Dashboard</span>
                    </div>
                  </Link>
                  <Button variant="outline" className="w-full">Log Out</Button>
                </>
              ) : (
                <>
                  <Link to="/login" className="w-full" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full">Log In</Button>
                  </Link>
                  <Link to="/register" className="w-full" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
