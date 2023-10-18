import {Button, Card, ListGroup} from "react-bootstrap";
import {clpFormat, percentFormat} from "../helpers/currencyFormatter.js";

export const IndicatorCard = ({
                                indicator = {},
                                handleShowDetails,
                                handleClickIndicatorDetail
                              }) => {

  const handleClickDetails = (indicator) => {
    handleShowDetails(true);
    handleClickIndicatorDetail(indicator);
  }

  return (
    <div className="col-12 col-sm-12 col-lg-4 mb-2 d-flex align-items-stretch">
      <Card className="w-100 shadow-sm mb-4">
        <Card.Body>
          <ListGroup>
            <ListGroup.Item className="fw-bold">
              <i className="bi bi-bar-chart-line"></i> {indicator["nombre"]}
            </ListGroup.Item>
            <ListGroup.Item>
              <i className="bi bi-wallet"></i> Valor: {
              indicator["unidad_medida"] === "Pesos" || indicator["unidad_medida"] === "Dólar" ?
                clpFormat(indicator["valor"]) :
                percentFormat(indicator["valor"])
            }
            </ListGroup.Item>
            <ListGroup.Item>
              <i className="bi bi-rulers"></i> {indicator["unidad_medida"]}
            </ListGroup.Item>
            <ListGroup.Item>
              <i className="bi bi-calculator-fill"></i> Código: {indicator["codigo"]}
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
        <Card.Footer>
          <Button
            onClick={() => handleClickDetails(indicator)}
            className="w-100"
            variant="secondary">
            <i className="bi bi-card-checklist"></i> Detalles
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
};