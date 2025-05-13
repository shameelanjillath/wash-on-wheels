
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Users, 
  CarFront, 
  CalendarIcon, 
  Settings, 
  Map, 
  Home,
  User,
  MoreVertical,
  AlertCircle,
  CheckCircle2,
  BarChart3,
  DollarSign,
  ArrowUp,
  ArrowDown
} from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <div className="flex-1 flex">
        <SidebarProvider>
          <div className="flex min-h-[calc(100vh-64px)] w-full">
            <Sidebar className="w-64 border-r">
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Main</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton className="flex items-center gap-2 w-full px-3 py-2 hover:bg-muted rounded-md">
                          <Home className="h-5 w-5" />
                          Dashboard
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton className="flex items-center gap-2 w-full px-3 py-2 hover:bg-muted rounded-md">
                          <Users className="h-5 w-5" />
                          Users
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton className="flex items-center gap-2 w-full px-3 py-2 hover:bg-muted rounded-md">
                          <CarFront className="h-5 w-5" />
                          Vendors
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
                          <Map className="h-5 w-5" />
                          Locations
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
                          Account
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton className="flex items-center gap-2 w-full px-3 py-2 hover:bg-muted rounded-md">
                          <Settings className="h-5 w-5" />
                          System
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
            
            <div className="flex-1 p-6">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <div className="flex items-center gap-4">
                  <Button>
                    <User className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </div>
              
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="users">Users</TabsTrigger>
                  <TabsTrigger value="vendors">Vendors</TabsTrigger>
                  <TabsTrigger value="bookings">Bookings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Stats Cards */}
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">1,248</div>
                        <p className="text-xs text-muted-foreground">
                          <span className="text-emerald-500 flex items-center">
                            <ArrowUp className="h-3 w-3 mr-1" />12.5%
                          </span>{" "}
                          from last month
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Vendors</CardTitle>
                        <CarFront className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">124</div>
                        <p className="text-xs text-muted-foreground">
                          <span className="text-emerald-500 flex items-center">
                            <ArrowUp className="h-3 w-3 mr-1" />8.2%
                          </span>{" "}
                          from last month
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Bookings</CardTitle>
                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">3,842</div>
                        <p className="text-xs text-muted-foreground">
                          <span className="text-emerald-500 flex items-center">
                            <ArrowUp className="h-3 w-3 mr-1" />18.2%
                          </span>{" "}
                          from last month
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">$42,536</div>
                        <p className="text-xs text-muted-foreground">
                          <span className="text-red-500 flex items-center">
                            <ArrowDown className="h-3 w-3 mr-1" />4.5%
                          </span>{" "}
                          from last month
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Recent Sign-ups</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Name</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {[1, 2, 3, 4, 5].map((index) => (
                              <TableRow key={index}>
                                <TableCell>User {index}</TableCell>
                                <TableCell>{index % 3 === 0 ? "Vendor" : "Customer"}</TableCell>
                                <TableCell>2025-05-{10 + index}</TableCell>
                                <TableCell className="text-right">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="sm">
                                        <MoreVertical className="h-4 w-4" />
                                        <span className="sr-only">Actions</span>
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem>View</DropdownMenuItem>
                                      <DropdownMenuItem>Edit</DropdownMenuItem>
                                      <DropdownMenuItem>Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Recent Bookings</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Customer</TableHead>
                              <TableHead>Vendor</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {[1, 2, 3, 4, 5].map((index) => (
                              <TableRow key={index}>
                                <TableCell>Customer {index}</TableCell>
                                <TableCell>Vendor {index % 3 + 1}</TableCell>
                                <TableCell>
                                  {index % 3 === 0 ? (
                                    <span className="inline-flex items-center text-amber-600">
                                      <AlertCircle className="h-3 w-3 mr-1" /> Pending
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center text-emerald-600">
                                      <CheckCircle2 className="h-3 w-3 mr-1" /> Completed
                                    </span>
                                  )}
                                </TableCell>
                                <TableCell className="text-right">${15 + index * 5}.00</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Revenue Chart</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-center h-64 bg-muted/20 rounded-md">
                        <div className="flex flex-col items-center text-muted-foreground">
                          <BarChart3 className="h-10 w-10 mb-2" />
                          <p>Chart will be displayed here</p>
                          <p className="text-sm">Connect to Supabase to see real data</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="users">
                  <Card>
                    <CardHeader>
                      <CardTitle>Users Management</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {Array.from({ length: 10 }, (_, i) => (
                            <TableRow key={i}>
                              <TableCell>User {i + 1}</TableCell>
                              <TableCell>user{i + 1}@example.com</TableCell>
                              <TableCell>{i % 3 === 0 ? "Admin" : i % 3 === 1 ? "Vendor" : "Customer"}</TableCell>
                              <TableCell>
                                {i % 4 === 0 ? (
                                  <span className="text-amber-600">Pending</span>
                                ) : (
                                  <span className="text-emerald-600">Active</span>
                                )}
                              </TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <MoreVertical className="h-4 w-4" />
                                      <span className="sr-only">Actions</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>View User</DropdownMenuItem>
                                    <DropdownMenuItem>Edit User</DropdownMenuItem>
                                    <DropdownMenuItem>Change Role</DropdownMenuItem>
                                    {i % 4 === 0 ? (
                                      <DropdownMenuItem>Approve User</DropdownMenuItem>
                                    ) : (
                                      <DropdownMenuItem>Deactivate User</DropdownMenuItem>
                                    )}
                                    <DropdownMenuItem className="text-red-600">Delete User</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="vendors" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Vendor Management</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Name</TableHead>
                              <TableHead>Location</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Rating</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {Array.from({ length: 5 }, (_, i) => (
                              <TableRow key={i}>
                                <TableCell className="font-medium">Vendor {i + 1}</TableCell>
                                <TableCell>Location {i + 1}</TableCell>
                                <TableCell>
                                  {i % 3 === 0 ? (
                                    <span className="inline-flex items-center text-amber-600">
                                      <AlertCircle className="h-3 w-3 mr-1" /> Pending Review
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center text-emerald-600">
                                      <CheckCircle2 className="h-3 w-3 mr-1" /> Active
                                    </span>
                                  )}
                                </TableCell>
                                <TableCell>{(4 + i % 2 * 0.5).toFixed(1)}/5</TableCell>
                                <TableCell className="text-right">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="sm">
                                        <MoreVertical className="h-4 w-4" />
                                        <span className="sr-only">Actions</span>
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem>View Details</DropdownMenuItem>
                                      <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                                      <DropdownMenuItem>View Services</DropdownMenuItem>
                                      <DropdownMenuItem>View Bookings</DropdownMenuItem>
                                      {i % 3 === 0 ? (
                                        <DropdownMenuItem>Approve Vendor</DropdownMenuItem>
                                      ) : (
                                        <DropdownMenuItem>Mark as Featured</DropdownMenuItem>
                                      )}
                                      <DropdownMenuItem className="text-red-600">Suspend Vendor</DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="bookings" className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">Booking Management</h3>
                      <p className="text-sm text-muted-foreground">
                        Manage all car wash bookings across vendors
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline">Filter</Button>
                      <Button variant="outline">Export CSV</Button>
                    </div>
                  </div>
                  
                  <Card>
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Booking ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Vendor</TableHead>
                            <TableHead>Service</TableHead>
                            <TableHead>Date & Time</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {Array.from({ length: 10 }, (_, i) => (
                            <TableRow key={i}>
                              <TableCell className="font-mono text-sm">BOOK-{1000 + i}</TableCell>
                              <TableCell>Customer {i + 1}</TableCell>
                              <TableCell>Vendor {(i % 5) + 1}</TableCell>
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
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <MoreVertical className="h-4 w-4" />
                                      <span className="sr-only">Actions</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>View Details</DropdownMenuItem>
                                    <DropdownMenuItem>Contact Customer</DropdownMenuItem>
                                    <DropdownMenuItem>Contact Vendor</DropdownMenuItem>
                                    {i % 4 === 0 && (
                                      <DropdownMenuItem>Confirm Booking</DropdownMenuItem>
                                    )}
                                    {(i % 4 === 0 || i % 4 === 1) && (
                                      <DropdownMenuItem className="text-red-600">Cancel Booking</DropdownMenuItem>
                                    )}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
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
