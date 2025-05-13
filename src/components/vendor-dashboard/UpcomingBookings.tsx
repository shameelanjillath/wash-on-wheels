
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarIcon } from "lucide-react";

// Mock data
const upcomingBookings = [
  { id: "B1001", customer: "John Smith", service: "Premium Wash", time: "Today, 2:30 PM", status: "Upcoming" },
  { id: "B1002", customer: "Jane Doe", service: "Full Detail", time: "Today, 4:00 PM", status: "Upcoming" },
  { id: "B1003", customer: "Mike Johnson", service: "Basic Wash", time: "Tomorrow, 10:00 AM", status: "Upcoming" },
  { id: "B1004", customer: "Sarah Brown", service: "Interior Clean", time: "Tomorrow, 1:15 PM", status: "Upcoming" },
];

export const UpcomingBookings = () => {
  return (
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
  );
};
