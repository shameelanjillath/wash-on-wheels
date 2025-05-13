
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Map from "@/components/ui/Map";

export const BusinessLocation = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Location</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="aspect-video bg-muted rounded-md relative overflow-hidden">
          <Map
            center={[-74.006, 40.7128]} // NYC
            zoom={15}
            markers={[
              {
                lat: 40.7128,
                lng: -74.006,
                title: "Express Auto Spa"
              }
            ]}
            className="h-full"
          />
        </div>
        <div className="mt-4 text-sm">
          <p className="font-medium">Express Auto Spa</p>
          <p className="text-muted-foreground">123 Main Street, New York, NY 10001</p>
        </div>
      </CardContent>
    </Card>
  );
};
