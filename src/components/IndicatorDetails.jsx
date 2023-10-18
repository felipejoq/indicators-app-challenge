import {Button, ListGroup, Modal} from "react-bootstrap";
import {TableSerieDetail} from "./TableSerieDetail.jsx";
import {formatDateToLocale} from "../helpers/dateFormatter.js";
import {clpFormat, percentFormat} from "../helpers/currencyFormatter.js";
import {Loading} from "./Loader.jsx";

export const IndicatorDetails = ({loadingDetails, showDetails, handleCloseDetails, indicatorDetail = {}}) => {

  const closeModalDetail = () => {
    handleCloseDetails(false)
  }

  return (

    <Modal
      show={showDetails}
      onHide={closeModalDetail}
      size="lg"
      centered
    >
      {
        loadingDetails ?
          <Loading/> :
          <>
            <Modal.Header closeButton>
              <Modal.Title>
                <i className="bi bi-card-checklist"></i> {indicatorDetail["nombre"]} - Detalles
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ListGroup>
                <ListGroup.Item>
                  <span className="fw-bold"><i className="bi bi-bar-chart-line"></i> Nombre: </span>
                  {indicatorDetail["nombre"]}
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="fw-bold"><i className="bi bi-calculator-fill"></i> Código: </span>
                  {indicatorDetail["codigo"]}
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="fw-bold"><i className="bi bi-calendar4"></i> Fecha: </span>
                  {formatDateToLocale(indicatorDetail["fecha"])}
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="fw-bold"><i className="bi bi-wallet"></i> Valor: </span> {
                  indicatorDetail["unidad_medida"] === "Pesos" || indicatorDetail["unidad_medida"] === "Dólar" ?
                    clpFormat(indicatorDetail["valor"]) :
                    percentFormat(indicatorDetail["valor"])
                } {
                  indicatorDetail["unidad_medida"] === "Porcentaje" ? null : indicatorDetail["unidad_medida"]
                }
                </ListGroup.Item>
                <ListGroup.Item>
                  <TableSerieDetail
                    series={indicatorDetail["serie"]}
                    unidad={indicatorDetail["unidad_medida"]}
                  />
                </ListGroup.Item>
              </ListGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeModalDetail}>
                Cerrar
              </Button>
            </Modal.Footer>
          </>

      }
    </Modal>
  );
};