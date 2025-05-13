
import { useState, useEffect } from 'react';
import db from '@/utils/db/postgresql';

interface UseDatabaseOptions {
  query: string;
  params?: any[];
  enabled?: boolean;
}

interface UseDatabaseResult<T> {
  data: T[] | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * A hook for executing PostgreSQL queries in React components
 * @param options Query options
 * @returns Query results, loading state, error state and refetch function
 */
export function useDatabase<T = any>({ 
  query, 
  params = [], 
  enabled = true 
}: UseDatabaseOptions): UseDatabaseResult<T> {
  const [data, setData] = useState<T[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(enabled);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await db.query(query, params);
      setData(result.rows);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      console.error('Error executing query in useDatabase:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (enabled) {
      fetchData();
    }
  }, [query, JSON.stringify(params), enabled]);

  const refetch = async () => {
    await fetchData();
  };

  return { data, isLoading, error, refetch };
}

export default useDatabase;
