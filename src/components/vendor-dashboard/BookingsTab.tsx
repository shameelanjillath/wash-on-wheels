
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertCircle, CalendarIcon, CheckCircle2 } from "lucide-react";

export const BookingsTab = () => {
  return (
    <div className="space-y-6">
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
    </div>
  );
};
