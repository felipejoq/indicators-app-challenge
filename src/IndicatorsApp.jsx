import {useEffect, useState} from "react";
import {IndicatorCard} from "./components/IndicatorCard.jsx";
import {IndicatorDetails} from "./components/IndicatorDetails.jsx";

const url = `https://mindicador.cl/api`;
const IndicatorsApp = () => {

  const [indicators, setIndicators] = useState([]);
  const [codigo, setCodigo] = useState('');
  const [indicatorDetail, setIndicatorDetail] = useState({})
  const [showDetails, setShowDetails] = useState(false);

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
    const response = await fetch(`${url}`);
    const result = await response.json();
    const indicatorsClean = cleanIndicatorsData(result);
    setIndicators(indicatorsClean);
  }

  const getIndicatorByCode = async (codigo) => {
    const response = await fetch(`${url}/${codigo}`);
    const indicator = await response.json();
    setIndicatorDetail({
      ...indicatorDetail,
      ...indicator
    })
  }

  const cleanIndicatorsData = (result) => {
    const indicatorsMap = [];
    for (const indicator in result) {
      indicatorsMap.push(result[indicator]);
    }
    return indicatorsMap.filter(indicator => indicator["codigo"]);
  }

  return (
    <div className="container">
      <h1>Indicadores Económicos Chile 🇨🇱</h1>
      <hr/>
      <div className="row row-cols-3">
        {
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
          ))
        }
      </div>

      <IndicatorDetails
        showDetails={showDetails}
        handleCloseDetails={handleCloseDetails}
        indicatorDetail={indicatorDetail}
      />
    </div>
  )
}

export default IndicatorsApp
