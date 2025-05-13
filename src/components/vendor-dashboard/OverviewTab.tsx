
import { StatsCards } from "./StatsCards";
import { UpcomingBookings } from "./UpcomingBookings";
import { BusinessLocation } from "./BusinessLocation";

export const OverviewTab = () => {
  return (
    <div className="space-y-6">
      <StatsCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UpcomingBookings />
        <BusinessLocation />
      </div>
    </div>
  );
};
