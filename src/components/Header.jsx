import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {Search} from "./Search.jsx";
import {formatDateToLocale} from "../helpers/dateFormatters.js";

export const Header = () => {
  return (
    <header>
      <Navbar expand="lg" className="bg-body-tertiary justify-content-between" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>
            <h1 className="fs-5">Indicadores Económicos Chile 🇨🇱</h1>
          </Navbar.Brand>
          <Navbar.Toggle/>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <i className="bi bi-calendar4"></i> {formatDateToLocale(new Date())}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}