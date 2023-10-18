import {Table} from "react-bootstrap";
import {useRef} from "react";
import {formatDateToLocale} from "../helpers/dateFormatter.js";
import {clpFormat, percentFormat} from "../helpers/currencyFormatter.js";
import { v4 as uuid } from 'uuid';


export const TableSerieDetail = ({series = [], unidad=''}) => {

  const table = useRef(null);

  return (
    <>
      <h5 className="my-4"><i className="bi bi-table"></i> Valores último mes:</h5>
      <Table ref={table} striped bordered hover responsive>
        <thead>
        <tr>
          <th><i className="bi bi-calendar4"></i> Fecha</th>
          <th className="text-center"><i className="bi bi-wallet"></i> Valor ({unidad})</th>
        </tr>
        </thead>
        <tbody>
        {
          series.map(serie => (
            <tr key={uuid()}>
              <td>{formatDateToLocale(serie.fecha)}</td>
              <td className="text-center">
                {
                  unidad === 'Pesos' || unidad === 'Dólar' ?
                    clpFormat(serie.valor) :
                    percentFormat(serie.valor)
                }
              </td>
            </tr>
          ))
        }
        </tbody>
      </Table>
    </>
  );
};

