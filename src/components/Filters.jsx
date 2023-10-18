import {Badge} from "react-bootstrap";

export const Filters = ({filterByUnit}) => {

  const list = ["Pesos", "Dólar", "Porcentaje"]

  return (
    <h6 className="my-2">
      {
        list.map(filter => (
          <Badge
            key={filter}
            onClick={() => filterByUnit(filter)}
            className="mx-1 cursor-pointer"
            bg="success">
            {filter}
          </Badge>
        ))
      }
    </h6>
  );
};