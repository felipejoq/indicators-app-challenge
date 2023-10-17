import {Table} from "react-bootstrap";

export const TableSerieDetail = ({series = []}) => {
  return (
    <Table striped bordered hover>
      <thead>
      <tr>
        <th>Fecha</th>
        <th>Valor</th>
      </tr>
      </thead>
      <tbody>
      {
        series.map(serie => (
          <tr key={self.crypto.randomUUID()}>
            <td>{serie.fecha}</td>
            <td>{serie.valor}</td>
          </tr>
        ))
      }
      </tbody>
    </Table>
  );
};

