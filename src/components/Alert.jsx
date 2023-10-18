import {Alert} from "react-bootstrap";

export const InfoMessage = ({variant = "success", message = "Mensaje por defecto"}) => {
  return (
      <Alert
        className="col-12 w-100 text-center"
        variant={variant}
      >
        {message}
      </Alert>
  );
};