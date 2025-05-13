
import db from './postgresql';

/**
 * Initialize database tables and schema
 */
export async function initializeDatabase() {
  try {
    console.log("Checking database structure...");
    
    // Check if tables exist by querying for a table that should be there
    const tableCheckQuery = `
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'user_profiles'
      );
    `;
    
    const result = await db.query(tableCheckQuery);
    const tablesExist = result.rows[0]?.exists;
    
    if (!tablesExist) {
      console.log("Creating database tables...");
      
      // Create users profile table
      await db.query(`
        CREATE TABLE IF NOT EXISTS public.user_profiles (
          id UUID PRIMARY KEY,
          email TEXT UNIQUE NOT NULL,
          first_name TEXT,
          last_name TEXT,
          role TEXT NOT NULL DEFAULT 'user',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `);
      
      // Create bookings table
      await db.query(`
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
      `);
      
      // Create services table
      await db.query(`
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
      `);
      
      // Create vendor locations table
      await db.query(`
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
      `);
      
      console.log("Database tables created successfully");
      
      // Insert some sample data (can be removed in production)
      await insertSampleData();
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
      await db.query(`
        INSERT INTO public.user_profiles (id, email, first_name, last_name, role)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (email) DO NOTHING
      `, [user.id, user.email, user.first_name, user.last_name, user.role]);
    }
    
    // Insert sample services for the vendor
    const services = [
      { vendor_id: '550e8400-e29b-41d4-a716-446655440000', name: 'Basic Car Wash', description: 'Exterior wash with hand dry', price: 19.99, duration: 30 },
      { vendor_id: '550e8400-e29b-41d4-a716-446655440000', name: 'Premium Wash', description: 'Exterior wash, interior vacuum, and window cleaning', price: 39.99, duration: 60 },
      { vendor_id: '550e8400-e29b-41d4-a716-446655440000', name: 'Deluxe Detail', description: 'Full interior and exterior detailing with wax', price: 149.99, duration: 180 }
    ];
    
    for (const service of services) {
      await db.query(`
        INSERT INTO public.services (vendor_id, name, description, price, duration)
        VALUES ($1, $2, $3, $4, $5)
      `, [service.vendor_id, service.name, service.description, service.price, service.duration]);
    }
    
    // Insert vendor location
    await db.query(`
      INSERT INTO public.vendor_locations (vendor_id, address, city, state, zip, lat, lng)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (id) DO NOTHING
    `, [
      '550e8400-e29b-41d4-a716-446655440000',
      '123 Main St',
      'Anytown',
      'CA',
      '12345',
      37.7749, 
      -122.4194
    ]);
    
    console.log("Sample data inserted successfully");
  } catch (error) {
    console.error("Error inserting sample data:", error);
  }
}

export default initializeDatabase;
