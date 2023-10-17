import {Button, Card} from "react-bootstrap";
import {IndicatorDetails} from "./IndicatorDetails.jsx";

export const IndicatorCard = ({
                                indicator = {},
                                showDetails,
                                handleShowDetails,
                                handleClickIndicatorDetail,
                                handleCloseDetails,
                                indicatorDetail
                              }) => {

  const handleClickDetails = (indicator) => {
    handleShowDetails(true);
    handleClickIndicatorDetail(indicator);
  }

  return (
    <div className="col mb-2 d-flex align-items-stretch">
      <Card className="w-100">
        <Card.Body>
          <Card.Title>
            {indicator["nombre"]}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Valor: {indicator["valor"]}
          </Card.Subtitle>
          <Card.Text>
            Unidad de medida: {indicator["unidad_medida"]}
          </Card.Text>
          <Card.Text>
            Código: {indicator["codigo"]}
          </Card.Text>
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