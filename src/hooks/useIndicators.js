import {useEffect, useState} from "react";
import {
  getIndicatorByCode,
  getIndicatorByTerm,
  getIndicatorByUnit,
  getIndicators
} from "../services/indicators.services.js";

export const useIndicators = () => {

  const [showDetails, setShowDetails] = useState(false);
  const [textSearch, setTextSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const [codigo, setCodigo] = useState('');
  const [indicators, setIndicators] = useState([]);
  const [indicatorDetail, setIndicatorDetail] = useState({})
  const [data, setData] = useState([]);
  const [hasErrors, setHasErrors] = useState({})

  useEffect(() => {
    if (!codigo) {
      (async () => {
        try {
          setLoading(true);
          const indicatorsClean = await getIndicators();
          setIndicators(indicatorsClean);
          setData(indicatorsClean);
          setLoading(false);
          setHasErrors({
            error: false
          });
        } catch (e) {
          setHasErrors({
            error: true,
            message: e.message
          });
          setLoading(false);
        }
      })()
    } else {
      (async () => {
        try {
          setLoadingDetails(true);
          const indicator = await getIndicatorByCode(codigo);
          setIndicatorDetail({
            ...indicatorDetail,
            ...indicator
          });
          setLoadingDetails(false);
          setHasErrors({
            error: false
          });
        } catch (e) {
          setHasErrors({
            error: true,
            message: e.message
          });
          setLoadingDetails(false);
        }
      })()
    }
  }, [codigo]);

  const handleClickIndicatorDetail = (indicator) => {
    setIndicatorDetail({
      ...indicatorDetail,
      fecha: indicator["fecha"],
      valor: indicator["valor"]
    })
    setCodigo(indicator["codigo"]);
  }

  const handleSearchInputText = ({target}) => {
    const {value} = target;
    if (value.length > 0) {
      setTextSearch(value);
      setData(getIndicatorByTerm(value, indicators));
    } else {
      setTextSearch(value);
      setData([...indicators])
    }
  }

  const filterByUnit = (term) => {
    setData(getIndicatorByUnit(term, indicators));
  }

  const handleCloseDetails = (isShow) => {
    setShowDetails(isShow)
  };

  const handleShowDetails = (isShow) => {
    setShowDetails(isShow)
  };

  return {
    data,
    indicators,
    indicatorDetail,
    textSearch,
    loading,
    loadingDetails,
    showDetails,
    hasErrors,
    handleSearchInputText,
    filterByUnit,
    handleCloseDetails,
    handleShowDetails,
    handleClickIndicatorDetail
  }
};