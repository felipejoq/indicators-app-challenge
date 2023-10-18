import {useEffect, useState} from "react";
import {IndicatorCard} from "./components/IndicatorCard.jsx";
import {IndicatorDetails} from "./components/IndicatorDetails.jsx";
import {formatDateToLocale} from "./helpers/dateFormatter.js";
import {Loading} from "./components/Loader.jsx";
import {Footer} from "./components/Footer.jsx";
import {InfoMessage} from "./components/Alert.jsx";
import {
  getIndicatorByCode,
  getIndicatorByTerm,
  getIndicatorByUnit,
  getIndicators
} from "./services/indicators.services.js";
import {Badge} from "react-bootstrap";
import {Filters} from "./components/Filters.jsx";

const IndicatorsApp = () => {

  const [indicators, setIndicators] = useState([]);
  const [codigo, setCodigo] = useState('');
  const [indicatorDetail, setIndicatorDetail] = useState({})
  const [showDetails, setShowDetails] = useState(false);
  const [textSearch, setTextSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [data, setData] = useState([])

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
    (async () => {
      setLoading(true);
      const indicatorsClean = await getIndicators();
      setIndicators(indicatorsClean);
      setData(indicatorsClean);
      setLoading(false);
    })()

  }, []);

  useEffect(() => {
    (async () => {
      setLoadingDetails(true);
      const indicator = await getIndicatorByCode(codigo);
      setIndicatorDetail({
        ...indicatorDetail,
        ...indicator
      });
      setLoadingDetails(false);
    })()

  }, [codigo]);

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

  return (
    <div className="container my-2">
      <h1>Indicadores Económicos Chile 🇨🇱</h1>
      <h4>🗓️ {formatDateToLocale(indicators[0]?.fecha)}</h4>
      <hr/>
      <div className="row">
        <div className="col-12">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar indicador..."
            onChange={handleSearchInputText}
            value={textSearch}
          />
        </div>
        <div className="col-12">
          <Filters filterByUnit={filterByUnit}/>
        </div>
      </div>
      <hr/>
      <div className="row row-cols-3">
        {
          loading ?
            <Loading/> :
            data.map(indicator => (
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
        {
          (data.length === 0) &&
          <InfoMessage message={'No hay resultados...'} variant={"info"}/>
        }
      </div>

      <IndicatorDetails
        showDetails={showDetails}
        handleCloseDetails={handleCloseDetails}
        indicatorDetail={indicatorDetail}
        loadingDetails={loadingDetails}
      />

      <Footer/>
    </div>
  )
}

export default IndicatorsApp
