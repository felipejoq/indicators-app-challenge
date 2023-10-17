import {useState} from "react";
import {Button, ListGroup, Modal} from "react-bootstrap";
import {TableSerieDetail} from "./TableSerieDetail.jsx";

export const IndicatorDetails = ({showDetails, handleCloseDetails, indicatorDetail = {}}) => {

  const closeModalDetail = () => {
    handleCloseDetails(false)
  }

  return (
    <>
      <Modal
        show={showDetails}
        onHide={closeModalDetail}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {indicatorDetail["nombre"]} - Detalles
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            <ListGroup.Item>
              Nombre: {indicatorDetail["nombre"]}
            </ListGroup.Item>
            <ListGroup.Item>
              Código: {indicatorDetail["codigo"]}
            </ListGroup.Item>
            <ListGroup.Item>
              Unidad de medida: {indicatorDetail["unidad_medida"]}
            </ListGroup.Item>
            <ListGroup.Item>
              Fecha: {indicatorDetail["fecha"]}
            </ListGroup.Item>
            <ListGroup.Item>
              Valor: {indicatorDetail["valor"]}
            </ListGroup.Item>
            <ListGroup.Item>
              <TableSerieDetail series={indicatorDetail["serie"]} />
            </ListGroup.Item>
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModalDetail}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};