import {Table} from "react-bootstrap";
import useFetch from "../hooks/useFetch.js";
import {URL_SERVICE} from "../helpers/constants.js";
import {IndicatorDetails} from "./IndicatorDetails.jsx";
import {formatDateToLocale} from "../helpers/dateFormatters.js";
import {valueFormat} from "../helpers/currencyFormatter.js";
import {Search} from "./Search.jsx";
import {InfoMessage} from "./Alert.jsx";
import {useEffect, useState} from "react";
import {getIndicatorByTerm, getIndicatorByUnit} from "../services/indicators.js";
import {Filters} from "./Filters.jsx";

export const TableIndicators = () => {

  const {data: indicators, error, isLoading} = useFetch(URL_SERVICE, true)
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(indicators);
  }, [isLoading]);

  const handleTermSearch = (term) => {
    if (!term) {
      setData(indicators);
    } else {
      setData(getIndicatorByTerm(term, indicators))
    }
  }

  const filterByUnit = (unit) => {
    if(unit ==="Todos") {
      setData(indicators)
    } else {
      setData(getIndicatorByUnit(unit, indicators))
    }
  }

  return (
    <main className="container my-4">
      <Search handleTermSearch={handleTermSearch}/>
      <Filters filterByUnit={filterByUnit}/>
      {
        isLoading ?
          "Cargando..." :
          error.has ?
            <InfoMessage message={`Hubo un error: ${error.message}`} variant="danger" /> :
            data.length === 0 ?
              <InfoMessage message="No hay resultados." variant="info" /> :
            <Table striped bordered hover>
              <thead>
              <tr>
                <th><i className="bi bi-bar-chart-line"></i> Nombre</th>
                <th><i className="bi bi-wallet"></i> Valor</th>
                <th><i className="bi bi-rulers"></i> Unidad</th>
                <th><i className="bi bi-calendar4"></i> Fecha</th>
                <th className="text-center"><i className="bi bi-eye-fill"></i></th>
              </tr>
              </thead>
              <tbody>
              {
                data.map(indicator => (
                  <tr key={indicator["codigo"]}>
                    <td>{indicator["nombre"]}</td>
                    <td>{valueFormat(indicator.valor, indicator.unidad_medida)}</td>
                    <td>{indicator["unidad_medida"]}</td>
                    <td>{formatDateToLocale(indicator.fecha)}</td>
                    <td className="text-center">
                      <IndicatorDetails indicator={indicator}/>
                    </td>
                  </tr>
                ))
              }
              </tbody>
            </Table>

      }
    </main>
  );
};