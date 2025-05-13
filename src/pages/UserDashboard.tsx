
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarTrigger, 
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";
import NavBar from "@/components/layout/NavBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CarFront, 
  CalendarIcon, 
  User,
  Settings,
  Home,
  Star,
  Clock,
  CheckCircle2,
  MapPin
} from "lucide-react";

// Mock upcoming bookings
const upcomingBookings = [
  {
    id: "B1001",
    vendor: "Premiere Auto Spa",
    service: "Premium Wash",
    date: "May 14, 2025",
    time: "2:30 PM",
    status: "Confirmed"
  },
  {
    id: "B1002",
    vendor: "Express Wash & Go",
    service: "Basic Wash",
    date: "May 16, 2025",
    time: "10:00 AM",
    status: "Pending"
  }
];

// Mock past bookings
const pastBookings = [
  {
    id: "B1000",
    vendor: "Luxury Detail Center",
    service: "Full Detail",
    date: "May 5, 2025",
    time: "1:00 PM",
    status: "Completed"
  },
  {
    id: "B999",
    vendor: "Green Eco Wash",
    service: "Interior Clean",
    date: "Apr 28, 2025",
    time: "11:30 AM",
    status: "Completed"
  },
  {
    id: "B998",
    vendor: "Quick Clean Car Wash",
    service: "Express Wash",
    date: "Apr 15, 2025",
    time: "9:15 AM",
    status: "Completed"
  }
];

// Mock favorite vendors
const favoriteVendors = [
  {
    id: "v1",
    name: "Premiere Auto Spa",
    address: "123 Main St, New York",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: "v2",
    name: "Luxury Detail Center",
    address: "789 Broadway, New York",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1605164599901-1f815edf61d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
  }
];

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const userInitials = "JS"; // This would come from the authenticated user
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <div className="flex-1 flex">
        <SidebarProvider>
          <div className="flex min-h-[calc(100vh-64px)] w-full">
            <Sidebar className="w-64 border-r">
              <div className="p-4">
                <div className="flex items-center gap-2 mb-6">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="https://i.pravatar.cc/150?u=user" />
                    <AvatarFallback>{userInitials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">John Smith</p>
                    <p className="text-sm text-muted-foreground">john@example.com</p>
                  </div>
                </div>
              </div>
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
                          My Bookings
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton className="flex items-center gap-2 w-full px-3 py-2 hover:bg-muted rounded-md">
                          <Star className="h-5 w-5" />
                          Favorites
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <Link to="/booking" className="flex items-center gap-2 w-full px-3 py-2 hover:bg-muted rounded-md">
                          <CarFront className="h-5 w-5" />
                          Book New Wash
                        </Link>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                  <SidebarGroupLabel>Account</SidebarGroupLabel>
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
                          <Settings className="h-5 w-5" />
                          Settings
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
            
            <div className="flex-1 p-6">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">My Dashboard</h1>
                <Link to="/booking">
                  <Button>
                    <CarFront className="h-4 w-4 mr-2" />
                    Book a Car Wash
                  </Button>
                </Link>
              </div>
              
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="bookings">All Bookings</TabsTrigger>
                  <TabsTrigger value="favorites">Favorites</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-6">
                  {/* Welcome Card */}
                  <Card className="bg-gradient-to-r from-carwash-secondary to-carwash-primary text-white">
                    <CardHeader>
                      <CardTitle>Welcome back, John!</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Keep your car sparkling clean with regular washes.
                        We've found some great car wash locations near you.</p>
                    </CardContent>
                    <CardFooter>
                      <Link to="/vendors">
                        <Button variant="secondary">
                          Find Nearby Car Washes
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                  
                  {/* Upcoming Bookings */}
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle>Upcoming Bookings</CardTitle>
                      <Link to="/booking">
                        <Button variant="outline" size="sm">
                          Book New
                        </Button>
                      </Link>
                    </CardHeader>
                    <CardContent>
                      {upcomingBookings.length > 0 ? (
                        <div className="space-y-4">
                          {upcomingBookings.map((booking) => (
                            <div
                              key={booking.id}
                              className="flex items-center justify-between p-4 border rounded-lg"
                            >
                              <div className="flex items-start gap-4">
                                <div className="rounded-full bg-blue-100 p-2">
                                  <CalendarIcon className="h-5 w-5 text-carwash-primary" />
                                </div>
                                <div>
                                  <h3 className="font-medium">{booking.vendor}</h3>
                                  <p className="text-sm text-muted-foreground">{booking.service}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {booking.date} at {booking.time}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <Badge variant={booking.status === "Confirmed" ? "default" : "outline"}>
                                  {booking.status}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                          <CalendarIcon className="h-10 w-10 text-muted-foreground mb-2" />
                          <p className="text-muted-foreground">No upcoming bookings</p>
                          <Link to="/booking" className="mt-4">
                            <Button>Book a Car Wash</Button>
                          </Link>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  {/* Favorite Locations */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Favorite Locations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {favoriteVendors.map((vendor) => (
                          <div
                            key={vendor.id}
                            className="flex border rounded-lg overflow-hidden"
                          >
                            <div className="w-1/3 relative">
                              <img
                                src={vendor.image}
                                alt={vendor.name}
                                className="absolute inset-0 h-full w-full object-cover"
                              />
                            </div>
                            <div className="w-2/3 p-4">
                              <h3 className="font-medium">{vendor.name}</h3>
                              <div className="flex items-center mb-2">
                                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                                <span className="text-sm">{vendor.rating.toFixed(1)}</span>
                              </div>
                              <p className="text-sm text-muted-foreground flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                {vendor.address}
                              </p>
                              <Link to={`/booking?vendor=${vendor.id}`} className="mt-2 inline-block">
                                <Button size="sm">Book Now</Button>
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="bookings" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>All My Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Booking ID</TableHead>
                            <TableHead>Car Wash</TableHead>
                            <TableHead>Service</TableHead>
                            <TableHead>Date & Time</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {/* Upcoming bookings */}
                          {upcomingBookings.map((booking) => (
                            <TableRow key={booking.id}>
                              <TableCell className="font-mono text-sm">{booking.id}</TableCell>
                              <TableCell>{booking.vendor}</TableCell>
                              <TableCell>{booking.service}</TableCell>
                              <TableCell>{booking.date} at {booking.time}</TableCell>
                              <TableCell>
                                {booking.status === "Confirmed" ? (
                                  <Badge>Confirmed</Badge>
                                ) : (
                                  <Badge variant="outline">Pending</Badge>
                                )}
                              </TableCell>
                              <TableCell className="text-right">
                                <Button variant="outline" size="sm">View</Button>
                              </TableCell>
                            </TableRow>
                          ))}
                          
                          {/* Past bookings */}
                          {pastBookings.map((booking) => (
                            <TableRow key={booking.id}>
                              <TableCell className="font-mono text-sm">{booking.id}</TableCell>
                              <TableCell>{booking.vendor}</TableCell>
                              <TableCell>{booking.service}</TableCell>
                              <TableCell>{booking.date} at {booking.time}</TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <CheckCircle2 className="h-3 w-3 text-green-600 mr-1" />
                                  <span className="text-green-600">Completed</span>
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button variant="outline" size="sm">View</Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="favorites" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favoriteVendors.map((vendor) => (
                      <Card key={vendor.id} className="overflow-hidden">
                        <div className="aspect-video relative">
                          <img
                            src={vendor.image}
                            alt={vendor.name}
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        </div>
                        <CardContent className="pt-6">
                          <h3 className="font-medium text-lg mb-2">{vendor.name}</h3>
                          <div className="flex items-center mb-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.floor(vendor.rating)
                                      ? "text-yellow-400 fill-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="ml-1 text-sm text-gray-600">
                              {vendor.rating.toFixed(1)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground flex items-center mb-4">
                            <MapPin className="h-3 w-3 mr-1" />
                            {vendor.address}
                          </p>
                          <div className="flex gap-2">
                            <Link to={`/booking?vendor=${vendor.id}`} className="flex-1">
                              <Button className="w-full" size="sm">
                                Book Now
                              </Button>
                            </Link>
                            <Button variant="outline" size="sm">
                              Remove
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    <Card className="flex flex-col items-center justify-center p-6 border-dashed">
                      <div className="mb-4 rounded-full bg-muted p-6">
                        <CarFront className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="font-medium mb-2">Find More Car Washes</h3>
                      <p className="text-sm text-muted-foreground text-center mb-6">
                        Explore more car wash locations near you and add them to your favorites.
                      </p>
                      <Link to="/vendors">
                        <Button>Browse Locations</Button>
                      </Link>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </SidebarProvider>
      </div>
    </div>
  );
}
