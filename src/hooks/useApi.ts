import axios from 'axios';
import { useEffect, useState } from 'react';

export function useGETApi<T = unknown>(url: string) {
  const [isFetching, setIsFetching] = useState(true);
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  
  const api = axios.create({
    baseURL: process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api'
      : 'https://abatcaverna.app/api'
  })

  useEffect(() => {
    api.get(url)
      .then((response) => setData(response.data))
      .catch((err) => setError(err))
      .finally(() => {
        setIsFetching(false)
      })
  }, [])


  return { data, error, isFetching };

}