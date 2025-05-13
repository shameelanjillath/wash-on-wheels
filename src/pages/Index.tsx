
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import VendorCard, { Vendor } from "@/components/vendor/VendorCard";
import { MapPin, Search, CarFront, Calendar, Star } from "lucide-react";

// Mock featured vendors
const featuredVendors: Vendor[] = [
  {
    id: "v1",
    name: "Premiere Auto Spa",
    address: "123 Main St",
    city: "New York",
    state: "NY",
    image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    rating: 4.8,
    reviewCount: 156,
    price: 3,
    services: ["Full Service", "Interior Detailing", "Exterior Detailing", "Waxing"],
    hours: {
      open: "8:00 AM",
      close: "6:00 PM"
    },
    lat: 40.7128,
    lng: -74.006
  },
  {
    id: "v2",
    name: "Express Wash & Go",
    address: "456 Park Ave",
    city: "New York",
    state: "NY",
    image: "https://images.unsplash.com/photo-1605164599901-1f815edf61d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    rating: 4.5,
    reviewCount: 89,
    price: 1,
    services: ["Express Wash", "Interior Vacuum", "Tire Shine"],
    hours: {
      open: "7:00 AM",
      close: "8:00 PM"
    },
    lat: 40.7213,
    lng: -73.9970
  },
  {
    id: "v3",
    name: "Luxury Detail Center",
    address: "789 Broadway",
    city: "New York",
    state: "NY",
    image: "https://images.unsplash.com/photo-1601055903647-ddf1ee9701b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    rating: 4.9,
    reviewCount: 217,
    price: 3,
    services: ["Premium Detail", "Ceramic Coating", "Paint Correction", "Interior Restoration"],
    hours: {
      open: "9:00 AM",
      close: "7:00 PM"
    },
    lat: 40.7308,
    lng: -73.9973
  }
];

const features = [
  {
    icon: <MapPin className="h-8 w-8 text-carwash-primary" />,
    title: "Find Nearby Car Washes",
    description: "Discover top-rated car wash services near your location with our interactive map."
  },
  {
    icon: <Calendar className="h-8 w-8 text-carwash-primary" />,
    title: "Easy Booking",
    description: "Schedule appointments with just a few clicks. Choose your time and service type."
  },
  {
    icon: <CarFront className="h-8 w-8 text-carwash-primary" />,
    title: "Variety of Services",
    description: "From basic washes to premium detailing, find the perfect service for your vehicle."
  },
  {
    icon: <Star className="h-8 w-8 text-carwash-primary" />,
    title: "Verified Reviews",
    description: "Read authentic customer reviews and ratings to choose the best service provider."
  }
];

export default function Index() {
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState("");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchLocation.trim()) {
      navigate(`/vendors?location=${encodeURIComponent(searchLocation)}`);
    }
  };
  
  const handleBookNow = (vendor: Vendor) => {
    navigate(`/booking?vendor=${vendor.id}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      {/* Hero Section */}
      <section className="hero-gradient py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-carwash-dark">
              Find & Book the Best Car Wash Near You
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Discover top-rated car wash services in your area. Book online instantly.
            </p>
            
            <form onSubmit={handleSearch} className="max-w-lg mx-auto relative">
              <div className="flex rounded-full overflow-hidden shadow-lg">
                <div className="flex-grow relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Enter your location"
                    className="pl-10 py-6 rounded-l-full border-0 text-base focus:outline-none focus:ring-2 focus:ring-carwash-primary"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="rounded-r-full px-8 bg-carwash-primary hover:bg-carwash-secondary"
                >
                  <Search className="mr-2 h-5 w-5" />
                  <span className="hidden sm:inline">Search</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6 rounded-lg transition-all hover:shadow-md">
                <div className="mb-4 p-3 bg-blue-50 rounded-full">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Vendors Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Car Washes</h2>
            <Button 
              variant="outline" 
              onClick={() => navigate('/vendors')}
              className="hidden sm:flex"
            >
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredVendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                featured={true}
                onSelectLocation={handleBookNow}
              />
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              onClick={() => navigate('/vendors')}
              className="sm:hidden"
            >
              View All Car Washes
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-carwash-dark text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to join our network?</h2>
            <p className="text-lg text-gray-300 mb-8">
              Are you a car wash business owner? Partner with us to reach more customers and grow your business.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                variant="default" 
                className="bg-carwash-primary hover:bg-carwash-secondary text-white"
                onClick={() => navigate('/register')}
              >
                Sign Up as Customer
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-carwash-dark"
                onClick={() => navigate('/register')}
              >
                Register Your Business
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
