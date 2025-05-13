
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const ServicesTab = () => {
  return (
    <div className="space-y-6">
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
    </div>
  );
};
