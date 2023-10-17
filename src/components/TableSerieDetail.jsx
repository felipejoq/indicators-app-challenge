import {Table} from "react-bootstrap";
import {useRef} from "react";
import {formatDateToLocale} from "../helpers/dateFormatter.js";
import {clpFormat, percentFormat} from "../helpers/currencyFormatter.js";

export const TableSerieDetail = ({series = [], unidad=''}) => {

  const table = useRef(null);

  return (
    <>
      <h5 className="my-4">⭐️ Valores últimos 30 días:</h5>
      <Table ref={table} striped bordered hover responsive>
        <thead>
        <tr>
          <th>🗓️ Fecha</th>
          <th className="text-center">💰 Valor ({unidad})</th>
        </tr>
        </thead>
        <tbody>
        {
          series.map(serie => (
            <tr key={self.crypto.randomUUID()}>
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

