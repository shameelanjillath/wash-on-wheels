
import { Link } from "react-router-dom";
import { 
  MapPin, 
  Star, 
  Clock, 
  ArrowRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export type Vendor = {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  image: string;
  rating: number;
  reviewCount: number;
  price: number; // 1-3 representing $-$$$
  services: string[];
  hours: {
    open: string;
    close: string;
  };
  distance?: number; // in miles, optional
  lat: number;
  lng: number;
};

interface VendorCardProps {
  vendor: Vendor;
  onSelectLocation?: (vendor: Vendor) => void;
  featured?: boolean;
}

export default function VendorCard({ 
  vendor, 
  onSelectLocation,
  featured = false
}: VendorCardProps) {
  const {
    id,
    name,
    address,
    city,
    state,
    image,
    rating,
    reviewCount,
    price,
    services,
    hours,
    distance
  } = vendor;

  const renderPrice = () => {
    let priceString = "";
    for (let i = 0; i < price; i++) {
      priceString += "$";
    }
    return priceString;
  };

  const renderRating = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="h-4 w-4 text-gray-300" />
          <div className="absolute top-0 left-0 overflow-hidden w-1/2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }

    return (
      <div className="flex items-center">
        <div className="flex">{stars}</div>
        <span className="ml-1 text-sm text-gray-600">
          ({reviewCount})
        </span>
      </div>
    );
  };

  return (
    <div 
      className={cn(
        "flex flex-col bg-white border rounded-lg overflow-hidden transition-all hover:shadow-md",
        featured && "shadow-lg border-carwash-primary/20"
      )}
    >
      {featured && (
        <Badge className="absolute top-2 right-2 bg-carwash-primary">
          Featured
        </Badge>
      )}
      <div className="aspect-[16/9] relative overflow-hidden">
        <img
          src={image || "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyJTIwd2FzaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-medium line-clamp-1">{name}</h3>
          <span className="text-sm font-medium text-gray-600">{renderPrice()}</span>
        </div>
        
        <div className="mb-2">{renderRating()}</div>
        
        <div className="flex items-center text-gray-600 mb-3 text-sm">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="line-clamp-1">{address}, {city}, {state}</span>
        </div>
        
        {distance !== undefined && (
          <div className="mb-2 text-sm text-carwash-secondary font-medium">
            {distance < 1 ? `${(distance * 5280).toFixed(0)} ft away` : `${distance.toFixed(1)} miles away`}
          </div>
        )}
        
        <div className="flex flex-wrap gap-1 mb-3">
          {services.slice(0, 3).map((service, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {service}
            </Badge>
          ))}
          {services.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{services.length - 3} more
            </Badge>
          )}
        </div>
        
        <div className="flex items-center text-gray-600 text-sm mb-4">
          <Clock className="h-4 w-4 mr-1" />
          <span>{hours.open} - {hours.close}</span>
        </div>
        
        <div className="mt-auto flex flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => onSelectLocation && onSelectLocation(vendor)}
          >
            Book Now
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
          <Link to={`/vendors/${id}`} className="flex-1">
            <Button variant="secondary" className="w-full">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Helper function to combine tailwind classes conditionally
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
