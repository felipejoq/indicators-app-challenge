import {useEffect, useState} from "react";
import {IndicatorCard} from "./components/IndicatorCard.jsx";

const IndicatorsApp = () => {

  const [indicators, setIndicators] = useState([]);

  useEffect(() => {
    getIndicators();
  }, []);

  const getIndicators = async () => {
    const url = 'https://mindicador.cl/api';
    const response = await fetch(url);
    const result = await response.json();
    const indicatorsClean = cleanIndicatorsData(result);
    setIndicators(indicatorsClean);
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
            <IndicatorCard key={indicator["codigo"]} indicator={indicator}/>
          ))
        }
      </div>
    </div>
  )
}

export default IndicatorsApp
