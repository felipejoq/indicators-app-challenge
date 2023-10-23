import {useEffect, useState} from "react";
import {
  getIndicatorByTerm,
  getIndicatorByUnit,
  getIndicators
} from "../services/indicators.services.js";

export const useIndicators = () => {
  const [codigo, setCodigo] = useState('');

  const [showDetails, setShowDetails] = useState(false);
  const [textSearch, setTextSearch] = useState('');
  const [loader, setLoader] = useState({
    loadingPage: true,
    loadingDetails: true
  })

  const [indicators, setIndicators] = useState([]);
  const [indicatorDetail, setIndicatorDetail] = useState({})
  const [data, setData] = useState([]);
  const [hasErrors, setHasErrors] = useState({})

  useEffect(() => {
    if (!codigo) {
      (async () => {
        try {
          changeLoaders(true, false);
          const indicatorsClean = await getIndicators();
          setIndicators(indicatorsClean);
          setData(indicatorsClean);
          changeLoaders(false, false);
          setError(false);
        } catch (e) {
          setError(e)
          changeLoaders(false, false);
        }
      })()
    } else {
      (async () => {
        try {
          changeLoaders(false, true);
          const indicator = await getIndicators(codigo);
          setIndicatorDetail({
            ...indicatorDetail,
            ...indicator
          });
          changeLoaders(false, false);
          setError(false);
        } catch (e) {
          setError(e)
          changeLoaders(false, false);
        }
      })()
    }
  }, [codigo]);

  const setError = (error) => {
    setHasErrors({
      error,
      message: error.message
    });
  }

  const changeLoaders = (loadingPage, loadingDetails) => {
    setLoader({
      loadingPage,
      loadingDetails
    });
  }

  const handleClickIndicatorDetail = (indicator) => {
    setIndicatorDetail({
      ...indicatorDetail,
      fecha: indicator["fecha"],
      valor: indicator["valor"]
    })
    setCodigo(indicator["codigo"]);
  }

  const handleSearchInputText = ({target: {value}}) => {
    setTextSearch(value);
    value.length > 0 ?
      setData(getIndicatorByTerm(value, indicators)) :
      setData([...indicators]);
  }

  const filterByUnit = (term) => {
    setData(getIndicatorByUnit(term, indicators));
  }

  const handleShowDetails = () => {
    setShowDetails(!showDetails)
  };

  return {
    data,
    indicators,
    indicatorDetail,
    textSearch,
    loader,
    showDetails,
    hasErrors,
    handleSearchInputText,
    filterByUnit,
    handleShowDetails,
    handleClickIndicatorDetail
  }
};