import {useEffect, useState} from "react";
import {getIndicators} from "../services/indicators.js";

const useFetch = (url, all = true) => {

  const [state, setState] = useState({
    data: [] || {},
    isLoading: true,
    error: {
      has: false,
      message: "No hay errores"
    },
  })

  const getFetch = async () => {
    try {
      setState({
        ...state,
        isLoading: true,
      });

      const data = await getIndicators(url, all);

      setState({
        ...state,
        data,
        isLoading: false,
      });

    } catch (e) {
      console.log(e)
      setState({
        ...state,
        isLoading: false,
        error: {
          has: true,
          message: e
        }
      });
    }
  }

  useEffect(() => {
    getFetch();
  }, [url]);

  return {
    ...state
  }
}

export default useFetch;