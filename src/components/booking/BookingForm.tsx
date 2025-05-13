
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Mock car wash data
const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
];

const services = [
  { id: "basic", name: "Basic Wash", price: 15 },
  { id: "deluxe", name: "Deluxe Wash", price: 25 },
  { id: "premium", name: "Premium Detail", price: 45 },
  { id: "interior", name: "Interior Clean", price: 35 },
];

const bookingSchema = z.object({
  location: z.string({ required_error: "Please select a location" }),
  date: z.date({ required_error: "Please select a date" }),
  time: z.string({ required_error: "Please select a time" }),
  service: z.string({ required_error: "Please select a service" }),
  vehicle: z.string({ required_error: "Please provide vehicle details" }),
  notes: z.string().optional(),
});

type BookingValues = z.infer<typeof bookingSchema>;

type BookingFormProps = {
  selectedLocation?: string;
  className?: string;
};

export default function BookingForm({ selectedLocation, className }: BookingFormProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<BookingValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      location: selectedLocation || "",
      notes: "",
    },
  });

  const selectedService = form.watch("service");
  const servicePrice = services.find(s => s.id === selectedService)?.price || 0;

  const onSubmit = async (data: BookingValues) => {
    setIsLoading(true);
    
    try {
      // This would normally be submitted to your backend API
      console.log("Booking data:", data);
      
      // Mock successful booking
      toast.success("Booking confirmed!");
      
      // Redirect to a confirmation page
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Booking failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a car wash location" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="loc1">Downtown Car Wash</SelectItem>
                    <SelectItem value="loc2">Uptown Auto Spa</SelectItem>
                    <SelectItem value="loc3">Westside Express Wash</SelectItem>
                    <SelectItem value="loc4">Eastside Detailing Center</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 1))
                        }
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time slot" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {services.map((service) => (
                      <div key={service.id} className="flex items-center space-x-2 border p-4 rounded-lg hover:border-carwash-primary cursor-pointer">
                        <RadioGroupItem value={service.id} id={service.id} />
                        <Label htmlFor={service.id} className="flex justify-between w-full cursor-pointer">
                          <span>{service.name}</span>
                          <span className="font-medium">${service.price}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="vehicle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vehicle Information</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Year, Make, Model (e.g., 2019 Honda Civic)"
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Please provide your vehicle details so we can better serve you.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Special Instructions (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any special requests or notes for the car wash service"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Booking Summary */}
          {selectedService && (
            <div className="bg-gray-50 p-4 rounded-lg border">
              <h3 className="font-medium text-lg mb-2">Booking Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Service:</span>
                  <span>{services.find(s => s.id === selectedService)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Price:</span>
                  <span className="font-medium">${servicePrice.toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t mt-2">
                  <div className="flex justify-between font-medium">
                    <span>Total:</span>
                    <span>${servicePrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Confirming Booking..." : "Confirm Booking"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
