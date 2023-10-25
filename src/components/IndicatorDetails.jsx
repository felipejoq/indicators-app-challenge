import {Button, ListGroup, Modal, Table} from "react-bootstrap";
import {useState} from "react";
import useFetch from "../hooks/useFetch.js";
import {URL_SERVICE} from "../helpers/constants.js";
import {TableSerie} from "./TableSerie.jsx";
import {formatDateToLocale} from "../helpers/dateFormatters.js";
import {valueFormat} from "../helpers/currencyFormatter.js";

export const IndicatorDetails = ({indicator}) => {
  const [show, setShow] = useState(false);

  const {
    data,
    isLoading,
    error
  } = useFetch(`${URL_SERVICE}/${indicator?.codigo}`, false)

  const handleClose = () => {
    setShow(false)
  };
  const handleShow = () => {
    setShow(true);
  };

  return (
    <>
      <Button
        onClick={handleShow}
        size="sm"
        variant="primary">
        <i className="bi bi-eye-fill"></i>
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-list"></i> {data.nombre} - Detalles
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            isLoading ?
              "Cargando..." :
              error.has ?
                `Hubo un error: ${error.message}` :
                <ListGroup>
                  <ListGroup.Item>
                    <i className="bi bi-hash"></i> <span className="fw-bold">Código:</span> {data.codigo}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <i className="bi bi-bar-chart-line"></i> <span className="fw-bold">Nombre:</span> {data.nombre}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <i className="bi bi-coin"></i> <span className="fw-bold">Valor:</span> {valueFormat(data.serie[0].valor, data.unidad_medida)}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <i className="bi bi-calendar4"></i> <span className="fw-bold">Fecha última medición:</span> {formatDateToLocale(new Date(data.serie[0].fecha))}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <TableSerie serie={data.serie} unidad={data.unidad_medida}/>
                  </ListGroup.Item>
                </ListGroup>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};