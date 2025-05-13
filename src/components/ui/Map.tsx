
import { useEffect, useRef, useState } from "react";

type MapProps = {
  center?: [number, number];
  zoom?: number;
  markers?: { lat: number; lng: number; title: string }[];
  onMarkerClick?: (index: number) => void;
  className?: string;
}

const Map = ({
  center = [-74.006, 40.7128], // NYC default
  zoom = 12,
  markers = [],
  onMarkerClick,
  className = "",
}: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapboxApiKey, setMapboxApiKey] = useState<string>("");
  const [map, setMap] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isApiKeyEntered, setIsApiKeyEntered] = useState(false);
  
  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mapboxApiKey) {
      setIsApiKeyEntered(true);
    }
  };

  useEffect(() => {
    if (!isApiKeyEntered || !mapRef.current) return;

    // Load Mapbox script dynamically
    const script = document.createElement("script");
    script.src = "https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js";
    script.async = true;
    document.head.appendChild(script);

    // Load Mapbox CSS
    const link = document.createElement("link");
    link.href = "https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    script.onload = () => {
      if (!window.mapboxgl) return;
      
      // Initialize map
      window.mapboxgl.accessToken = mapboxApiKey;
      
      const mapInstance = new window.mapboxgl.Map({
        container: mapRef.current!,
        style: "mapbox://styles/mapbox/streets-v12",
        center,
        zoom,
      });

      mapInstance.addControl(new window.mapboxgl.NavigationControl(), "top-right");
      
      setMap(mapInstance);
      setIsLoaded(true);

      return () => {
        mapInstance.remove();
        document.head.removeChild(script);
        document.head.removeChild(link);
      };
    };
  }, [center, zoom, isApiKeyEntered, mapboxApiKey]);

  // Add markers when map is loaded and markers change
  useEffect(() => {
    if (!map || !isLoaded) return;

    // Clear existing markers
    const existingMarkers = document.querySelectorAll('.mapboxgl-marker');
    existingMarkers.forEach(marker => marker.remove());

    // Add new markers
    markers.forEach((marker, index) => {
      const el = document.createElement("div");
      el.className = "marker";
      el.style.backgroundImage = "url(https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png)";
      el.style.width = "32px";
      el.style.height = "32px";
      el.style.backgroundSize = "cover";
      el.style.cursor = "pointer";

      const popup = new window.mapboxgl.Popup({ offset: 25 })
        .setHTML(`<h3 class="font-semibold">${marker.title}</h3>`);

      new window.mapboxgl.Marker(el)
        .setLngLat([marker.lng, marker.lat])
        .setPopup(popup)
        .addTo(map);

      el.addEventListener("click", () => {
        if (onMarkerClick) {
          onMarkerClick(index);
        }
      });
    });
  }, [map, markers, isLoaded, onMarkerClick]);

  if (!isApiKeyEntered) {
    return (
      <div className={`flex flex-col items-center justify-center p-6 border rounded-lg bg-gray-50 ${className}`}>
        <h3 className="text-lg font-medium mb-4">Mapbox API Key Required</h3>
        <p className="text-sm text-gray-500 mb-4 text-center">
          To display the map, please enter your Mapbox API key. You can get one for free at{" "}
          <a 
            href="https://mapbox.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-carwash-primary hover:underline"
          >
            mapbox.com
          </a>
        </p>
        <form onSubmit={handleApiKeySubmit} className="w-full max-w-md space-y-4">
          <input
            type="text"
            value={mapboxApiKey}
            onChange={(e) => setMapboxApiKey(e.target.value)}
            placeholder="Enter Mapbox API Key"
            className="w-full px-4 py-2 border rounded-md"
            required
          />
          <button
            type="submit"
            className="w-full bg-carwash-primary text-white py-2 rounded-md hover:bg-carwash-secondary transition-colors"
          >
            Load Map
          </button>
        </form>
      </div>
    );
  }

  return (
    <div 
      ref={mapRef} 
      className={`w-full h-96 rounded-lg ${className}`}
    />
  );
};

export default Map;

// Need to extend Window interface to include mapboxgl
declare global {
  interface Window {
    mapboxgl: any;
  }
}
