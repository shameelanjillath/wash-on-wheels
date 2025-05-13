
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";
import { 
  CalendarIcon, 
  CarFront, 
  Home,
  MapIcon, 
  Settings, 
  User
} from "lucide-react";

export const DashboardSidebar = () => {
  return (
    <Sidebar className="w-64 border-r">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="flex items-center gap-2 w-full px-3 py-2 hover:bg-muted rounded-md">
                  <Home className="h-5 w-5" />
                  Overview
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="flex items-center gap-2 w-full px-3 py-2 hover:bg-muted rounded-md">
                  <CalendarIcon className="h-5 w-5" />
                  Bookings
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="flex items-center gap-2 w-full px-3 py-2 hover:bg-muted rounded-md">
                  <CarFront className="h-5 w-5" />
                  Services
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="flex items-center gap-2 w-full px-3 py-2 hover:bg-muted rounded-md">
                  <User className="h-5 w-5" />
                  Profile
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="flex items-center gap-2 w-full px-3 py-2 hover:bg-muted rounded-md">
                  <MapIcon className="h-5 w-5" />
                  Location
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="flex items-center gap-2 w-full px-3 py-2 hover:bg-muted rounded-md">
                  <Settings className="h-5 w-5" />
                  Account
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
