
import { supabase } from "@/integrations/supabase/client";

/**
 * Initialize database tables and schema
 */
export async function initializeDatabase() {
  try {
    console.log("Checking database structure...");
    
    // Check if tables exist by querying for a table that should be there
    const { data, error } = await supabase
      .from('user_profiles')
      .select('id')
      .limit(1);
    
    if (error && error.code === '42P01') { // 42P01 is the error code for "relation does not exist"
      console.log("Creating database tables...");
      
      // Create users profile table
      await supabase.rpc('run_sql', {
        sql: `
          CREATE TABLE IF NOT EXISTS public.user_profiles (
            id UUID PRIMARY KEY,
            email TEXT UNIQUE NOT NULL,
            first_name TEXT,
            last_name TEXT,
            role TEXT NOT NULL DEFAULT 'user',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
        `
      });
      
      // Create bookings table
      await supabase.rpc('run_sql', {
        sql: `
          CREATE TABLE IF NOT EXISTS public.bookings (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID NOT NULL REFERENCES public.user_profiles(id),
            vendor_id UUID NOT NULL REFERENCES public.user_profiles(id),
            service_id UUID NOT NULL,
            booking_date TIMESTAMP WITH TIME ZONE NOT NULL,
            status TEXT NOT NULL DEFAULT 'pending',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
        `
      });
      
      // Create services table
      await supabase.rpc('run_sql', {
        sql: `
          CREATE TABLE IF NOT EXISTS public.services (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            vendor_id UUID NOT NULL REFERENCES public.user_profiles(id),
            name TEXT NOT NULL,
            description TEXT,
            price DECIMAL(10,2) NOT NULL,
            duration INTEGER NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
        `
      });
      
      // Create vendor locations table
      await supabase.rpc('run_sql', {
        sql: `
          CREATE TABLE IF NOT EXISTS public.vendor_locations (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            vendor_id UUID NOT NULL REFERENCES public.user_profiles(id),
            address TEXT NOT NULL,
            city TEXT NOT NULL,
            state TEXT NOT NULL,
            zip TEXT NOT NULL,
            lat DECIMAL(9,6),
            lng DECIMAL(9,6),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
        `
      });
      
      console.log("Database tables created successfully");
      
      // Insert some sample data (can be removed in production)
      await insertSampleData();
    } else if (error) {
      console.error("Error checking database structure:", error);
      return false;
    } else {
      console.log("Database tables already exist");
    }
    
    return true;
  } catch (error) {
    console.error("Error initializing database:", error);
    return false;
  }
}

/**
 * Insert sample data for development
 */
async function insertSampleData() {
  try {
    console.log("Inserting sample data...");
    
    // Insert sample user profiles
    const userProfiles = [
      { id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479', email: 'admin@example.com', first_name: 'Admin', last_name: 'User', role: 'admin' },
      { id: '550e8400-e29b-41d4-a716-446655440000', email: 'vendor@example.com', first_name: 'Vendor', last_name: 'User', role: 'vendor' },
      { id: '6ba7b810-9dad-11d1-80b4-00c04fd430c8', email: 'user@example.com', first_name: 'Regular', last_name: 'User', role: 'user' }
    ];
    
    for (const user of userProfiles) {
      const { error } = await supabase
        .from('user_profiles')
        .upsert(user, { onConflict: 'email' });
      
      if (error) console.error("Error inserting user profile:", error);
    }
    
    // Insert sample services for the vendor
    const services = [
      { vendor_id: '550e8400-e29b-41d4-a716-446655440000', name: 'Basic Car Wash', description: 'Exterior wash with hand dry', price: 19.99, duration: 30 },
      { vendor_id: '550e8400-e29b-41d4-a716-446655440000', name: 'Premium Wash', description: 'Exterior wash, interior vacuum, and window cleaning', price: 39.99, duration: 60 },
      { vendor_id: '550e8400-e29b-41d4-a716-446655440000', name: 'Deluxe Detail', description: 'Full interior and exterior detailing with wax', price: 149.99, duration: 180 }
    ];
    
    for (const service of services) {
      const { error } = await supabase
        .from('services')
        .insert(service);
      
      if (error) console.error("Error inserting service:", error);
    }
    
    // Insert vendor location
    const { error } = await supabase
      .from('vendor_locations')
      .insert({
        vendor_id: '550e8400-e29b-41d4-a716-446655440000',
        address: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zip: '12345',
        lat: 37.7749,
        lng: -122.4194
      });
    
    if (error) console.error("Error inserting vendor location:", error);
    
    console.log("Sample data inserted successfully");
  } catch (error) {
    console.error("Error inserting sample data:", error);
  }
}

export default initializeDatabase;
