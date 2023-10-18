import {Table} from "react-bootstrap";
import {formatDateToLocale} from "../helpers/dateFormatter.js";
import {clpFormat, percentFormat} from "../helpers/currencyFormatter.js";
import {v4 as uuid} from 'uuid';
import {useEffect, useState} from "react";

const ASC = "ASC"
const DESC = "DESC";
const UP = "UP";
const DOWN = "DOWN";

export const TableSerieDetail = ({series = [], unidad = ''}) => {

  const [data, setData] = useState([]);
  const [order, setOrder] = useState(DESC);
  const [reverse, setReverse] = useState(UP)

  useEffect(() => {
    setData(series)
  }, [series]);

  const handleReverseDate = () => {
      setData([...data.reverse()]);
    if (reverse === UP) {
      setReverse(DOWN)
    } else {
      setReverse(UP)
    }
  }

  const handleSortByValue = () => {
    if(order === "DESC") {
      setData([
        ...data
          .sort((a,b) => parseFloat(b.valor) - parseFloat(a.valor))
      ])
      setOrder(ASC)
    } else {
      setData([
        ...data
          .sort((a,b) => parseFloat(a.valor) - parseFloat(b.valor))
      ]);
      setOrder(DESC)
    }
  }

  return (
    <>
      <h5 className="my-4"><i className="bi bi-table"></i> Valores último mes:</h5>
      <Table striped bordered hover responsive>
        <thead>
        <tr>
          <th
            onClick={handleReverseDate}
            className="cursor-pointer"
          >
            <i className="bi bi-calendar4"></i>
            &nbsp;&nbsp;&nbsp;Fecha&nbsp;&nbsp;&nbsp;
            {
              reverse === UP ?
                <i className="bi bi-sort-up"></i> :
                <i className="bi bi-sort-down"></i>
            }
          </th>
          <th
            onClick={handleSortByValue}
            className="text-center cursor-pointer"
          >
            <i className="bi bi-wallet"></i>
            &nbsp;&nbsp;&nbsp;Valor ({unidad})&nbsp;&nbsp;&nbsp;
            {
              order === DESC ?
                <i className="bi bi-sort-up"></i> :
                <i className="bi bi-sort-down"></i>
            }
          </th>
        </tr>
        </thead>
        <tbody>
        {
          data.map(serie => (
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

