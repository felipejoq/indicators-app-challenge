import {Badge} from "react-bootstrap";

export const Filters = ({filterByUnit}) => {

  const list = ["Todos", "Pesos", "Dólar", "Porcentaje"]

  return (
    <div className="col-12">
      <h6 className="mb-4">
        {
          list.map(filter => (
            <Badge
              key={filter}
              onClick={() => filterByUnit(filter)}
              className="mx-1 cursor-pointer"
              bg={filter === "Todos" ? "primary" : "success"}>
              <i className="bi bi-tag-fill"></i> {filter}
            </Badge>
          ))
        }
      </h6>
    </div>
  );
};