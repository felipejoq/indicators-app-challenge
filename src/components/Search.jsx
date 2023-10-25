import {Form, InputGroup} from "react-bootstrap";

export const Search = ({handleTermSearch}) => {

  const onChangeTerm = ({target}) => {
    handleTermSearch(target.value)
  }

  return (
      <InputGroup className="my-4">
        <InputGroup.Text id="basic-addon1">
          Buscar
        </InputGroup.Text>
        <Form.Control
          onChange={onChangeTerm}
          placeholder="Escribir aquí..."
          aria-label="search"
          aria-describedby="search-bar"
        />
      </InputGroup>
  );
};