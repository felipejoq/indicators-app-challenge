import {Spinner} from "react-bootstrap";

export const Loading = ({ variant = "success"}) => {
  return (
    <div className="loader">
      <Spinner animation="border" variant={variant} />
    </div>
  );
};