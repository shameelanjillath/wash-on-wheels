
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import VendorCard, { Vendor } from "@/components/vendor/VendorCard";
import Map from "@/components/ui/Map";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Search, SlidersHorizontal, MapPin } from "lucide-react";

// Mock vendors data
const mockVendors: Vendor[] = [
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
    distance: 0.8,
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
    distance: 1.2,
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
    distance: 1.5,
    lat: 40.7308,
    lng: -73.9973
  },
  {
    id: "v4",
    name: "Quick Clean Car Wash",
    address: "321 Fifth Ave",
    city: "New York",
    state: "NY",
    image: "https://images.unsplash.com/photo-1563566614-15c95aa42c1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    rating: 4.2,
    reviewCount: 78,
    price: 2,
    services: ["Express Wash", "Wax Treatment", "Undercarriage Wash"],
    hours: {
      open: "6:00 AM",
      close: "9:00 PM"
    },
    distance: 2.3,
    lat: 40.7145,
    lng: -73.9940
  },
  {
    id: "v5",
    name: "Green Eco Wash",
    address: "567 Lexington Ave",
    city: "New York",
    state: "NY",
    image: "https://images.unsplash.com/photo-1588275729373-84c5b381ce5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    rating: 4.6,
    reviewCount: 102,
    price: 2,
    services: ["Eco-Friendly Wash", "Water Conservation", "Organic Products"],
    hours: {
      open: "8:00 AM",
      close: "6:00 PM"
    },
    distance: 3.1,
    lat: 40.7250,
    lng: -74.0010
  }
];

export default function VendorsList() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [priceFilter, setPriceFilter] = useState<number[]>([1, 3]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [serviceFilters, setServiceFilters] = useState<Record<string, boolean>>({
    "Express Wash": false,
    "Interior Detailing": false,
    "Exterior Detailing": false,
    "Full Service": false,
    "Waxing": false
  });
  const [mapCenterCoordinates, setMapCenterCoordinates] = useState<[number, number]>([-74.006, 40.7128]);
  
  useEffect(() => {
    // In a real app, this would fetch vendors from an API based on location
    // For now, we'll use our mock data
    setVendors(mockVendors);
  }, []);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger a new search with the location
  };
  
  const toggleFilterDialog = () => {
    setFilterDialogOpen(!filterDialogOpen);
  };
  
  const handleBookNow = (vendor: Vendor) => {
    navigate(`/booking?vendor=${vendor.id}`);
  };
  
  const handleMarkerClick = (index: number) => {
    // Scroll to the vendor card
    const vendorElements = document.querySelectorAll(".vendor-card");
    if (vendorElements[index]) {
      vendorElements[index].scrollIntoView({ behavior: "smooth" });
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Car Wash Locations</h1>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters sidebar - desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-lg font-medium mb-4">Filters</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">Price Range</h3>
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>$</span>
                    <span>$$$</span>
                  </div>
                  <Slider
                    defaultValue={[1, 3]}
                    min={1}
                    max={3}
                    step={1}
                    value={priceFilter}
                    onValueChange={setPriceFilter}
                  />
                  <div className="text-sm text-gray-600 mt-1">
                    ${priceFilter[0]} - ${priceFilter[1]}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Minimum Rating</h3>
                  <Slider
                    defaultValue={[0]}
                    min={0}
                    max={5}
                    step={0.5}
                    value={[ratingFilter]}
                    onValueChange={(value) => setRatingFilter(value[0])}
                  />
                  <div className="text-sm text-gray-600 mt-1">
                    {ratingFilter} stars & up
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Services</h3>
                  <div className="space-y-2">
                    {Object.keys(serviceFilters).map((service) => (
                      <div key={service} className="flex items-center">
                        <Checkbox
                          id={`service-${service}`}
                          checked={serviceFilters[service]}
                          onCheckedChange={(checked) => {
                            setServiceFilters({
                              ...serviceFilters,
                              [service]: Boolean(checked)
                            });
                          }}
                        />
                        <Label
                          htmlFor={`service-${service}`}
                          className="ml-2 text-sm"
                        >
                          {service}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <Button variant="outline" className="w-full mt-6">
                Reset Filters
              </Button>
            </div>
          </div>
          
          {/* Main content area */}
          <div className="flex-grow">
            {/* Search and filter bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <form onSubmit={handleSearch} className="flex-grow">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search by location"
                    className="pl-10"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </form>
              
              <Button
                variant="outline"
                className="md:hidden"
                onClick={toggleFilterDialog}
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>
            
            {/* Results count */}
            <p className="text-gray-600 mb-6">
              {vendors.length} car washes found in your area
            </p>
            
            {/* Map view */}
            <div className="mb-8 rounded-lg overflow-hidden border">
              <Map
                center={mapCenterCoordinates}
                zoom={13}
                markers={vendors.map((vendor) => ({
                  lat: vendor.lat,
                  lng: vendor.lng,
                  title: vendor.name
                }))}
                onMarkerClick={handleMarkerClick}
                className="h-80"
              />
            </div>
            
            {/* Vendors list */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
              {vendors.map((vendor, index) => (
                <div key={vendor.id} className="vendor-card">
                  <VendorCard
                    vendor={vendor}
                    onSelectLocation={handleBookNow}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
      
      {/* Mobile filter dialog */}
      {filterDialogOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-h-[80vh] rounded-t-xl p-6 overflow-y-auto animate-slide-up">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Filters</h2>
              <Button variant="ghost" size="sm" onClick={toggleFilterDialog}>
                Close
              </Button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Price Range</h3>
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>$</span>
                  <span>$$$</span>
                </div>
                <Slider
                  defaultValue={[1, 3]}
                  min={1}
                  max={3}
                  step={1}
                  value={priceFilter}
                  onValueChange={setPriceFilter}
                />
                <div className="text-sm text-gray-600 mt-1">
                  ${priceFilter[0]} - ${priceFilter[1]}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Minimum Rating</h3>
                <Slider
                  defaultValue={[0]}
                  min={0}
                  max={5}
                  step={0.5}
                  value={[ratingFilter]}
                  onValueChange={(value) => setRatingFilter(value[0])}
                />
                <div className="text-sm text-gray-600 mt-1">
                  {ratingFilter} stars & up
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Services</h3>
                <div className="space-y-2">
                  {Object.keys(serviceFilters).map((service) => (
                    <div key={service} className="flex items-center">
                      <Checkbox
                        id={`mobile-service-${service}`}
                        checked={serviceFilters[service]}
                        onCheckedChange={(checked) => {
                          setServiceFilters({
                            ...serviceFilters,
                            [service]: Boolean(checked)
                          });
                        }}
                      />
                      <Label
                        htmlFor={`mobile-service-${service}`}
                        className="ml-2 text-sm"
                      >
                        {service}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex gap-4 mt-6">
              <Button variant="outline" className="flex-1">
                Reset
              </Button>
              <Button className="flex-1" onClick={toggleFilterDialog}>
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
