import {useEffect, useState} from "react";
import {IndicatorCard} from "./components/IndicatorCard.jsx";
import {IndicatorDetails} from "./components/IndicatorDetails.jsx";
import {formatDateToLocale} from "./helpers/dateFormatter.js";
import {Loading} from "./components/Loader.jsx";
import {Footer} from "./components/Footer.jsx";

const url = `https://mindicador.cl/api`;
const IndicatorsApp = () => {

  const [indicators, setIndicators] = useState([]);
  const [codigo, setCodigo] = useState('');
  const [indicatorDetail, setIndicatorDetail] = useState({})
  const [showDetails, setShowDetails] = useState(false);
  const [textSearch, setTextSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const handleClickIndicatorDetail = (indicator) => {
    setIndicatorDetail({
      ...indicatorDetail,
      fecha: indicator["fecha"],
      valor: indicator["valor"]
    })
    setCodigo(indicator["codigo"]);
  }

  const handleCloseDetails = (isShow) => {
    setShowDetails(isShow)
  };
  const handleShowDetails = (isShow) => {
    setShowDetails(isShow)
  };

  useEffect(() => {
    getIndicators();
  }, []);

  useEffect(() => {
    getIndicatorByCode(codigo)
  }, [codigo]);

  const getIndicators = async () => {
    setLoading(true);
    const response = await fetch(`${url}`);
    const result = await response.json();
    const indicatorsClean = cleanIndicatorsData(result);
    setIndicators(indicatorsClean);
    setLoading(false);
  }

  const getIndicatorByCode = async (codigo) => {
    setLoadingDetails(true);
    const response = await fetch(`${url}/${codigo}`);
    const indicator = await response.json();
    setIndicatorDetail({
      ...indicatorDetail,
      ...indicator
    });
    setLoadingDetails(false);
  }

  const cleanIndicatorsData = (result) => {
    const indicatorsMap = [];
    for (const indicator in result) {
      indicatorsMap.push(result[indicator]);
    }
    return indicatorsMap.filter(indicator => indicator["codigo"]);
  }

  const handleSubmitSearchInput = (event) => {
    event.preventDefault();
    setSearchResult(getSearchByTerm(textSearch, indicators))
  }

  const handleSearchInputText = ({target}) => {
    const {value} = target;
    setTextSearch(value);
    setSearchResult(getSearchByTerm(value, indicators))
  }

  const getSearchByTerm = (term, indicators = []) => {
    return indicators.filter(indicator => {
      for (const key in indicator) {
        if (indicator[key].toString().toLowerCase().includes(term.toLowerCase().trim())) {
          return indicator;
        }
      }
    })
  }

  return (
    <div className="container my-2">
      <h1>Indicadores Económicos Chile 🇨🇱</h1>
      <h4>🗓️ {formatDateToLocale(indicators[0]?.fecha)}</h4>
      <hr/>
      <form onSubmit={handleSubmitSearchInput}>
        <input
          type="text"
          className="form-control"
          placeholder="Buscar indicador..."
          onChange={handleSearchInputText}
          value={textSearch}
        />
      </form>
      <hr/>
      <div className="row row-cols-3">
        {
          loading ?
            <Loading/> :
            !textSearch ?
              indicators.map(indicator => (
                <IndicatorCard
                  key={indicator["codigo"]}
                  indicator={indicator}
                  showDetails={showDetails}
                  handleClickIndicatorDetail={handleClickIndicatorDetail}
                  handleCloseDetails={handleCloseDetails}
                  handleShowDetails={handleShowDetails}
                  indicatorDetail={indicatorDetail}
                />
              )) :
              searchResult.map(indicator => (
                <IndicatorCard
                  key={indicator["codigo"]}
                  indicator={indicator}
                  showDetails={showDetails}
                  handleClickIndicatorDetail={handleClickIndicatorDetail}
                  handleCloseDetails={handleCloseDetails}
                  handleShowDetails={handleShowDetails}
                  indicatorDetail={indicatorDetail}
                />
              ))
        }
      </div>

      <IndicatorDetails
        showDetails={showDetails}
        handleCloseDetails={handleCloseDetails}
        indicatorDetail={indicatorDetail}
        loadingDetails={loadingDetails}
      />

      <Footer />
    </div>
  )
}

export default IndicatorsApp
