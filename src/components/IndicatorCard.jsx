import {Button, Card, ListGroup} from "react-bootstrap";
import {clpFormat, percentFormat} from "../helpers/currencyFormatter.js";
import {formatDateToLocale} from "../helpers/dateFormatter.js";

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
    <div className="col mb-2 d-flex align-items-stretch">
      <Card className="w-100">
        <Card.Body>
          <ListGroup>
            <ListGroup.Item className="fw-bold">
              📊 {indicator["nombre"]}
            </ListGroup.Item>
            <ListGroup.Item>
              💰 Valor: {
              indicator["unidad_medida"] === "Pesos" ?
                clpFormat(indicator["valor"]) :
                percentFormat(indicator["valor"])
            }
            </ListGroup.Item>
            <ListGroup.Item>
              📐 {indicator["unidad_medida"]}
            </ListGroup.Item>
            <ListGroup.Item>
              🆔 Código: {indicator["codigo"]}
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
        <Card.Footer>
          <Button
            onClick={() => handleClickDetails(indicator)}
            className="w-100"
            variant="primary">
            Detalles
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
};