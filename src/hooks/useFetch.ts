import { useState, useEffect } from 'react';

// TypeScript
type movieType = {
  id: number,
  isFavorite: boolean,
}

export const useFetch = (url: string, bool: boolean, method = "GET") => {
  const [datas, setDatas] = useState<[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchDatas = async () => {
      setLoading(true);

      try {
        const res = await fetch(url, { signal: controller.signal })
        if(!res.ok) throw new Error(res.statusText);

        const data = await res.json();

        setLoading(false);

        bool === true ?
        setDatas(data.filter((movie: movieType) => movie.isFavorite === bool)) :
        setDatas(data)

        setError(null);
        
      } catch (err: any) {
        if(err.name === "AbortError") {
          console.log("the fetch was aborted");
        } else {
          setLoading(false);
          setError('Service indisponible, réessayez plus tard SVP !');
        }
      }
    }

    fetchDatas();

    // Cleanup Function
    return () => {
      controller.abort();
    }

  }, [url, bool, method])

  return { datas, loading, error };
}
