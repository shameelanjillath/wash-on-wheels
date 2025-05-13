
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import NavBar from "@/components/layout/NavBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import refactored components
import { DashboardSidebar } from "@/components/vendor-dashboard/DashboardSidebar";
import { OverviewTab } from "@/components/vendor-dashboard/OverviewTab";
import { BookingsTab } from "@/components/vendor-dashboard/BookingsTab";
import { ServicesTab } from "@/components/vendor-dashboard/ServicesTab";
import { ProfileTab } from "@/components/vendor-dashboard/ProfileForm";

export default function VendorDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <div className="flex-1 flex">
        <SidebarProvider>
          <div className="flex min-h-[calc(100vh-64px)] w-full">
            <DashboardSidebar />
            
            <div className="flex-1 p-6">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Vendor Dashboard</h1>
              </div>
              
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="bookings">Bookings</TabsTrigger>
                  <TabsTrigger value="services">Services</TabsTrigger>
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-6">
                  <OverviewTab />
                </TabsContent>
                
                <TabsContent value="bookings" className="space-y-6">
                  <BookingsTab />
                </TabsContent>
                
                <TabsContent value="services" className="space-y-6">
                  <ServicesTab />
                </TabsContent>
                
                <TabsContent value="profile" className="space-y-6">
                  <ProfileTab />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </SidebarProvider>
      </div>
    </div>
  );
}
