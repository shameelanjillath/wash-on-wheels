import { Pool, PoolConfig } from 'pg';

// Default configuration for local development
const defaultConfig: PoolConfig = {
  host: 'localhost',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: '',
  // Maximum number of clients the pool should contain
  max: 20,
  // Maximum time in milliseconds that a client can be idle before being removed
  idleTimeoutMillis: 30000,
  // Maximum time in milliseconds to wait for a connection to be established
  connectionTimeoutMillis: 2000,
};

// Create configuration from environment variables if available
const pgConfig: PoolConfig = {
  host: import.meta.env.VITE_PG_HOST || defaultConfig.host,
  port: parseInt(import.meta.env.VITE_PG_PORT || defaultConfig.port.toString()),
  database: import.meta.env.VITE_PG_DATABASE || defaultConfig.database,
  user: import.meta.env.VITE_PG_USER || defaultConfig.user,
  password: import.meta.env.VITE_PG_PASSWORD || defaultConfig.password,
  max: defaultConfig.max,
  idleTimeoutMillis: defaultConfig.idleTimeoutMillis,
  connectionTimeoutMillis: defaultConfig.connectionTimeoutMillis,
};

// Create a pool of connections
const pool = new Pool(pgConfig);

// Listen for errors on the pool
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

/**
 * Execute a query with optional parameters
 * @param text SQL query
 * @param params Query parameters
 * @returns Query result
 */
export const query = async (text: string, params?: any[]) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log(`Executed query: ${text} - Duration: ${duration}ms - Rows: ${res.rowCount}`);
    return res;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
};

/**
 * Get a client from the pool
 * @returns Client from the connection pool
 */
export const getClient = async () => {
  const client = await pool.connect();
  const release = client.release;
  
  // Override client release to keep track of when it was returned to the pool
  client.release = () => {
    console.log('Client returned to pool');
    return release.apply(client);
  };
  
  return client;
};

/**
 * Test the database connection
 * @returns True if connection successful, false otherwise
 */
export const testConnection = async (): Promise<boolean> => {
  try {
    const res = await query('SELECT NOW()');
    console.log('Database connection successful:', res.rows[0]);
    return true;
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    return false;
  }
};

export default {
  query,
  getClient,
  testConnection,
  pool,
};
