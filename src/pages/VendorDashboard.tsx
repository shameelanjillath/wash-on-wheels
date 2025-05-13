
import { useState } from "react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { 
  CarFront, 
  CalendarIcon, 
  Settings, 
  Map, 
  Home,
  User,
  Clock,
  DollarSign,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

// Mock data
const upcomingBookings = [
  { id: "B1001", customer: "John Smith", service: "Premium Wash", time: "Today, 2:30 PM", status: "Upcoming" },
  { id: "B1002", customer: "Jane Doe", service: "Full Detail", time: "Today, 4:00 PM", status: "Upcoming" },
  { id: "B1003", customer: "Mike Johnson", service: "Basic Wash", time: "Tomorrow, 10:00 AM", status: "Upcoming" },
  { id: "B1004", customer: "Sarah Brown", service: "Interior Clean", time: "Tomorrow, 1:15 PM", status: "Upcoming" },
];

// Form schema for vendor profile
const profileFormSchema = z.object({
  businessName: z
    .string()
    .min(2, { message: "Business name must be at least 2 characters." }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address." }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters." }),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  state: z.string().min(2, { message: "State must be at least 2 characters." }),
  zipCode: z.string().min(5, { message: "ZIP code must be at least 5 digits." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." })
    .max(500, { message: "Description cannot exceed 500 characters." }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// Default values for the form
const defaultValues: Partial<ProfileFormValues> = {
  businessName: "Express Auto Spa",
  email: "contact@expressautospa.com",
  phone: "555-123-4567",
  address: "123 Main Street",
  city: "New York",
  state: "NY",
  zipCode: "10001",
  description: "Premium car wash services with eco-friendly products and state-of-the-art equipment.",
};

export default function VendorDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  });

  function onProfileSubmit(data: ProfileFormValues) {
    // In a real app, this would update the vendor profile in Supabase
    console.log("Profile updated:", data);
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <div className="flex-1 flex">
        <SidebarProvider>
          <div className="flex min-h-[calc(100vh-64px)] w-full">
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
                          <Map className="h-5 w-5" />
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Stats Cards */}
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Today's Bookings</CardTitle>
                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">8</div>
                        <p className="text-xs text-muted-foreground">2 more than yesterday</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">96%</div>
                        <p className="text-xs text-muted-foreground">+2% from last week</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Avg. Service Time</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">42 min</div>
                        <p className="text-xs text-muted-foreground">-5 min from last month</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Revenue (MTD)</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">$3,842</div>
                        <p className="text-xs text-muted-foreground">+18% from last month</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Upcoming Bookings</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Customer</TableHead>
                              <TableHead>Service</TableHead>
                              <TableHead>Time</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {upcomingBookings.map((booking) => (
                              <TableRow key={booking.id}>
                                <TableCell>{booking.customer}</TableCell>
                                <TableCell>{booking.service}</TableCell>
                                <TableCell>{booking.time}</TableCell>
                                <TableCell>
                                  <span className="inline-flex items-center text-blue-600">
                                    <CalendarIcon className="h-3 w-3 mr-1" /> {booking.status}
                                  </span>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Business Location</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="aspect-video bg-muted rounded-md relative overflow-hidden">
                          {/* This would be a Map component in a real app */}
                          <div className="absolute inset-0 flex items-center justify-center">
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
                        </div>
                        <div className="mt-4 text-sm">
                          <p className="font-medium">Express Auto Spa</p>
                          <p className="text-muted-foreground">123 Main Street, New York, NY 10001</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="bookings" className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">Booking Management</h3>
                      <p className="text-sm text-muted-foreground">
                        View and manage all your bookings
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Bookings</SelectItem>
                          <SelectItem value="upcoming">Upcoming</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline">Export</Button>
                    </div>
                  </div>
                  
                  <Card>
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Booking ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Service</TableHead>
                            <TableHead>Date & Time</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {Array.from({ length: 10 }, (_, i) => (
                            <TableRow key={i}>
                              <TableCell className="font-mono text-sm">BK-{1000 + i}</TableCell>
                              <TableCell>Customer {i + 1}</TableCell>
                              <TableCell>
                                {i % 3 === 0 
                                  ? "Basic Wash" 
                                  : i % 3 === 1 
                                  ? "Premium Detail" 
                                  : "Full Service"}
                              </TableCell>
                              <TableCell>2025-05-{13 + i} at {9 + i % 8}:00 {i % 8 < 3 ? "AM" : "PM"}</TableCell>
                              <TableCell>
                                {i % 4 === 0 ? (
                                  <span className="inline-flex items-center text-amber-600">
                                    <AlertCircle className="h-3 w-3 mr-1" /> Pending
                                  </span>
                                ) : i % 4 === 1 ? (
                                  <span className="inline-flex items-center text-blue-600">
                                    <CalendarIcon className="h-3 w-3 mr-1" /> Upcoming
                                  </span>
                                ) : i % 4 === 2 ? (
                                  <span className="inline-flex items-center text-emerald-600">
                                    <CheckCircle2 className="h-3 w-3 mr-1" /> Completed
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center text-red-600">
                                    <AlertCircle className="h-3 w-3 mr-1" /> Cancelled
                                  </span>
                                )}
                              </TableCell>
                              <TableCell>${(15 + i * 5).toFixed(2)}</TableCell>
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
                
                <TabsContent value="services" className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">Service Management</h3>
                      <p className="text-sm text-muted-foreground">
                        Manage your car wash services and pricing
                      </p>
                    </div>
                    <Button>Add New Service</Button>
                  </div>
                  
                  <Card>
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Service Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">Basic Wash</TableCell>
                            <TableCell>Exterior wash with basic cleaning</TableCell>
                            <TableCell>15 min</TableCell>
                            <TableCell>$15.00</TableCell>
                            <TableCell><span className="text-emerald-600">Active</span></TableCell>
                            <TableCell className="text-right space-x-2">
                              <Button variant="outline" size="sm">Edit</Button>
                              <Button variant="outline" size="sm" className="text-red-600">Disable</Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Deluxe Wash</TableCell>
                            <TableCell>Exterior wash and interior vacuum</TableCell>
                            <TableCell>30 min</TableCell>
                            <TableCell>$25.00</TableCell>
                            <TableCell><span className="text-emerald-600">Active</span></TableCell>
                            <TableCell className="text-right space-x-2">
                              <Button variant="outline" size="sm">Edit</Button>
                              <Button variant="outline" size="sm" className="text-red-600">Disable</Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Premium Detail</TableCell>
                            <TableCell>Full interior and exterior detailing</TableCell>
                            <TableCell>90 min</TableCell>
                            <TableCell>$75.00</TableCell>
                            <TableCell><span className="text-emerald-600">Active</span></TableCell>
                            <TableCell className="text-right space-x-2">
                              <Button variant="outline" size="sm">Edit</Button>
                              <Button variant="outline" size="sm" className="text-red-600">Disable</Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Interior Clean</TableCell>
                            <TableCell>Thorough interior cleaning and sanitizing</TableCell>
                            <TableCell>45 min</TableCell>
                            <TableCell>$45.00</TableCell>
                            <TableCell><span className="text-emerald-600">Active</span></TableCell>
                            <TableCell className="text-right space-x-2">
                              <Button variant="outline" size="sm">Edit</Button>
                              <Button variant="outline" size="sm" className="text-red-600">Disable</Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Wax Treatment</TableCell>
                            <TableCell>Premium wax application for lasting shine</TableCell>
                            <TableCell>60 min</TableCell>
                            <TableCell>$60.00</TableCell>
                            <TableCell><span className="text-red-600">Disabled</span></TableCell>
                            <TableCell className="text-right space-x-2">
                              <Button variant="outline" size="sm">Edit</Button>
                              <Button variant="outline" size="sm" className="text-emerald-600">Enable</Button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="profile" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Business Profile</h3>
                    <p className="text-sm text-muted-foreground">
                      Update your business information and details
                    </p>
                  </div>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <Form {...profileForm}>
                        <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                          <FormField
                            control={profileForm.control}
                            name="businessName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Business Name</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={profileForm.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={profileForm.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Phone</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={profileForm.control}
                            name="address"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Street Address</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <FormField
                              control={profileForm.control}
                              name="city"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>City</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={profileForm.control}
                              name="state"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>State</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={profileForm.control}
                              name="zipCode"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>ZIP Code</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={profileForm.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Business Description</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    {...field} 
                                    className="min-h-32" 
                                    placeholder="Describe your car wash business and services..."
                                  />
                                </FormControl>
                                <FormDescription>
                                  This description will be displayed to customers.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="flex justify-end">
                            <Button type="submit">Update Profile</Button>
                          </div>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </SidebarProvider>
      </div>
    </div>
  );
}
