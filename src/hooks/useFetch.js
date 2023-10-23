import {useEffect, useState} from "react";

export const useFetch = (url) => {

  const [state, setState] = useState({
    data: [],
    loading: true,
    hasError: false,
  });

  useEffect(() => {
    getData(url)
      .then(() => setError(false))
      .catch(() => setError(false))
  }, [url]);

  const getData = async (url) => {
    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        setError(true);
      }
      const data = await response.json();
      setState(data);
      setLoading(false);
    } catch (e) {
      setError(true);
    }
  }

  const setError = (hasError) => {
    setState({
      ...state,
      hasError
    });
  }

  const setLoading = (loading) => {
    setState({
      ...state,
      loading
    });
  }


  return {
    ...state,
  }
};