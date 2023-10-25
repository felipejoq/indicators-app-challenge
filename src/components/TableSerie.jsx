import {Table} from "react-bootstrap";
import {formatDateToLocale} from "../helpers/dateFormatters.js";
import {valueFormat} from "../helpers/currencyFormatter.js";
import {useEffect, useState} from "react";

const ASC = "ASC"
const DESC = "DESC";
const UP = "UP";
const DOWN = "DOWN";

export const TableSerie = ({serie = [], unidad}) => {

  const [data, setData] = useState(serie);
  const [order, setOrder] = useState(DESC);
  const [reverse, setReverse] = useState(UP);

  useEffect(() => {
    setData(serie)
  }, [serie]);

  const handleReverseDate = () => {
    setData([...data.reverse()]);
    if (reverse === UP) {
      setReverse(DOWN)
    } else {
      setReverse(UP)
    }
  }

  const handleSortByValue = () => {
    if (order === "DESC") {
      setData([
        ...data
          .sort((a, b) => parseFloat(b.valor) - parseFloat(a.valor))
      ])
      setOrder(ASC)
    } else {
      setData([
        ...data
          .sort((a, b) => parseFloat(a.valor) - parseFloat(b.valor))
      ]);
      setOrder(DESC)
    }
  }

  return (
    <>
      <p className="fw-bold"><i className="bi bi-clock-history"></i> Últimos registros:</p>
      <Table striped bordered hover size="sm">
        <thead>
        <tr className="">
          <th
            onClick={handleReverseDate}
            className="cursor-pointer"
          >
            <span><i className="bi bi-calendar4"></i> Fecha</span>
            <span className="">
              {
                reverse === UP ?
                  <i className="bi bi-sort-up"></i> :
                  <i className="bi bi-sort-down"></i>
              }
            </span>
          </th>
          <th
            onClick={handleSortByValue}
            className="cursor-pointer"
          >
            <span><i className="bi bi-coin"></i> Valor ({unidad})</span>
            <span>
              {
                order === DESC ?
                  <i className="bi bi-sort-up"></i> :
                  <i className="bi bi-sort-down"></i>
              }
            </span>
          </th>
        </tr>
        </thead>
        <tbody>
        {
          data.map(item => (
            <tr key={crypto.randomUUID()}>
              <td>{formatDateToLocale(item.fecha)}</td>
              <td>{valueFormat(item.valor, unidad)}</td>
            </tr>
          ))
        }
        </tbody>
      </Table>
    </>
  );
};