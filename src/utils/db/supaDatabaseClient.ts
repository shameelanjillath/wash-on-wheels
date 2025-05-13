
import { supabase } from "@/integrations/supabase/client";

/**
 * Execute a query with optional parameters using Supabase
 * @param text SQL query
 * @param params Query parameters
 * @returns Query result
 */
export const query = async (text: string, params?: any[]) => {
  const start = Date.now();
  try {
    // Using Supabase to execute SQL queries
    const { data, error } = await supabase.rpc('run_sql_query', { 
      sql_query: text,
      params: params || []
    });

    if (error) throw error;
    
    const duration = Date.now() - start;
    console.log(`Executed query: ${text} - Duration: ${duration}ms - Rows: ${data?.length || 0}`);
    return { rows: data || [], rowCount: data?.length || 0 };
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
};

/**
 * Test the database connection
 * @returns True if connection successful, false otherwise
 */
export const testConnection = async (): Promise<boolean> => {
  try {
    const { data, error } = await supabase.from('_test').select('*').limit(1);
    if (error) throw error;
    console.log('Database connection successful');
    return true;
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    return false;
  }
};

export default {
  query,
  testConnection
};
