
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import BookingForm from "@/components/booking/BookingForm";
import Map from "@/components/ui/Map";
import { Vendor } from "@/components/vendor/VendorCard";

// Mock vendors data
const mockVendors: Record<string, Vendor> = {
  "v1": {
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
  "v2": {
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
  }
}

export default function Booking() {
  const [searchParams] = useSearchParams();
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  
  // Get vendor ID from URL query parameter
  const vendorId = searchParams.get("vendor");
  
  useEffect(() => {
    // In a real app, this would fetch vendor data from API
    if (vendorId && mockVendors[vendorId]) {
      setSelectedVendor(mockVendors[vendorId]);
    }
  }, [vendorId]);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <div className="flex-grow container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h1 className="text-3xl font-bold mb-6">Book Your Car Wash</h1>
            
            {selectedVendor ? (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">{selectedVendor.name}</h2>
                <p className="text-gray-600 mb-4">
                  {selectedVendor.address}, {selectedVendor.city}, {selectedVendor.state}
                </p>
                <div className="text-sm text-gray-600 mb-6">
                  Operating Hours: {selectedVendor.hours.open} - {selectedVendor.hours.close}
                </div>
              </div>
            ) : (
              <p className="text-gray-600 mb-6">
                Select your preferred car wash location and service.
              </p>
            )}
            
            <BookingForm 
              selectedLocation={selectedVendor?.id}
            />
          </div>
          
          <div>
            <div className="sticky top-20">
              <h2 className="text-xl font-semibold mb-4">Location</h2>
              <Map 
                center={selectedVendor ? [selectedVendor.lng, selectedVendor.lat] : undefined}
                zoom={selectedVendor ? 15 : 12}
                markers={selectedVendor ? [
                  {
                    lat: selectedVendor.lat,
                    lng: selectedVendor.lng,
                    title: selectedVendor.name
                  }
                ] : []}
                className="rounded-lg h-[500px] shadow-sm border"
              />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
